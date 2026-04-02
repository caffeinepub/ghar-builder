import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Authorization System
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
    email : ?Text;
    phone : ?Text;
  };

  // Project Types
  type Project = {
    id : Nat;
    title : Text;
    description : Text;
    budgetRange : (Nat, Nat);
    category : Category;
    owner : Principal;
  };

  type Category = {
    #residential;
    #commercial;
    #renovation;
  };

  // Professional Types
  type Professional = {
    id : Nat;
    name : Text;
    specialty : Specialty;
    experience : Nat;
    serviceDescription : Text;
    owner : Principal;
  };

  type Specialty = {
    #contractor;
    #architect;
    #engineer;
    #carpenter;
  };

  // State Variables
  var nextProjectId = 0;
  var nextProfessionalId = 0;
  let projects = Map.empty<Nat, Project>();
  let professionals = Map.empty<Nat, Professional>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Project Functions
  public shared ({ caller }) func postProject(title : Text, description : Text, budgetRange : (Nat, Nat), category : Category) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can post projects");
    };

    let project : Project = {
      id = nextProjectId;
      title;
      description;
      budgetRange;
      category;
      owner = caller;
    };

    projects.add(nextProjectId, project);
    nextProjectId += 1;
    project.id;
  };

  public query func browseProjects(category : ?Category, minBudget : ?Nat, maxBudget : ?Nat) : async [Project] {
    projects.values().toArray().filter(
      func(project) {
        let categoryMatch = switch (category) {
          case (null) { true };
          case (?cat) { project.category == cat };
        };

        let budgetMatch = switch (minBudget, maxBudget) {
          case (null, null) { true };
          case (?min, null) { project.budgetRange.0 >= min };
          case (null, ?max) { project.budgetRange.1 <= max };
          case (?min, ?max) {
            project.budgetRange.0 >= min and project.budgetRange.1 <= max
          };
        };

        categoryMatch and budgetMatch;
      }
    );
  };

  public query ({ caller }) func getProject(projectId : Nat) : async ?Project {
    projects.get(projectId);
  };

  public shared ({ caller }) func updateProject(projectId : Nat, title : Text, description : Text, budgetRange : (Nat, Nat), category : Category) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update projects");
    };

    switch (projects.get(projectId)) {
      case (null) {
        Runtime.trap("Project not found");
      };
      case (?project) {
        if (project.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own projects");
        };

        let updatedProject : Project = {
          id = project.id;
          title;
          description;
          budgetRange;
          category;
          owner = project.owner;
        };

        projects.add(projectId, updatedProject);
      };
    };
  };

  public shared ({ caller }) func deleteProject(projectId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete projects");
    };

    switch (projects.get(projectId)) {
      case (null) {
        Runtime.trap("Project not found");
      };
      case (?project) {
        if (project.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own projects");
        };

        projects.remove(projectId);
      };
    };
  };

  // Professional Functions
  public shared ({ caller }) func createProfessionalProfile(name : Text, specialty : Specialty, experience : Nat, serviceDescription : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create profiles");
    };

    let professional : Professional = {
      id = nextProfessionalId;
      name;
      specialty;
      experience;
      serviceDescription;
      owner = caller;
    };

    professionals.add(nextProfessionalId, professional);
    nextProfessionalId += 1;
    professional.id;
  };

  public query func browseProfessionals(specialty : ?Specialty, minExperience : ?Nat) : async [Professional] {
    professionals.values().toArray().filter(
      func(professional) {
        let specialtyMatch = switch (specialty) {
          case (null) { true };
          case (?spec) { professional.specialty == spec };
        };

        let experienceMatch = switch (minExperience) {
          case (null) { true };
          case (?min) { professional.experience >= min };
        };

        specialtyMatch and experienceMatch;
      }
    );
  };

  public query ({ caller }) func getProfessional(professionalId : Nat) : async ?Professional {
    professionals.get(professionalId);
  };

  public shared ({ caller }) func updateProfessionalProfile(professionalId : Nat, name : Text, specialty : Specialty, experience : Nat, serviceDescription : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update profiles");
    };

    switch (professionals.get(professionalId)) {
      case (null) {
        Runtime.trap("Professional profile not found");
      };
      case (?professional) {
        if (professional.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own profile");
        };

        let updatedProfessional : Professional = {
          id = professional.id;
          name;
          specialty;
          experience;
          serviceDescription;
          owner = professional.owner;
        };

        professionals.add(professionalId, updatedProfessional);
      };
    };
  };

  public shared ({ caller }) func deleteProfessionalProfile(professionalId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete profiles");
    };

    switch (professionals.get(professionalId)) {
      case (null) {
        Runtime.trap("Professional profile not found");
      };
      case (?professional) {
        if (professional.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own profile");
        };

        professionals.remove(professionalId);
      };
    };
  };
};
