import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Professional {
    id: bigint;
    owner: Principal;
    name: string;
    serviceDescription: string;
    experience: bigint;
    specialty: Specialty;
}
export interface Project {
    id: bigint;
    title: string;
    owner: Principal;
    description: string;
    category: Category;
    budgetRange: [bigint, bigint];
}
export interface UserProfile {
    name: string;
    email?: string;
    phone?: string;
}
export enum Category {
    commercial = "commercial",
    residential = "residential",
    renovation = "renovation"
}
export enum Specialty {
    engineer = "engineer",
    architect = "architect",
    contractor = "contractor",
    carpenter = "carpenter"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    browseProfessionals(specialty: Specialty | null, minExperience: bigint | null): Promise<Array<Professional>>;
    browseProjects(category: Category | null, minBudget: bigint | null, maxBudget: bigint | null): Promise<Array<Project>>;
    createProfessionalProfile(name: string, specialty: Specialty, experience: bigint, serviceDescription: string): Promise<bigint>;
    deleteProfessionalProfile(professionalId: bigint): Promise<void>;
    deleteProject(projectId: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProfessional(professionalId: bigint): Promise<Professional | null>;
    getProject(projectId: bigint): Promise<Project | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    postProject(title: string, description: string, budgetRange: [bigint, bigint], category: Category): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProfessionalProfile(professionalId: bigint, name: string, specialty: Specialty, experience: bigint, serviceDescription: string): Promise<void>;
    updateProject(projectId: bigint, title: string, description: string, budgetRange: [bigint, bigint], category: Category): Promise<void>;
}
