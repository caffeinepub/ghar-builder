import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateProfessionalProfile } from '../hooks/useCreateProfessionalProfile';
import { Specialty } from '../backend';
import AccessDeniedScreen from '../components/AccessDeniedScreen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { HardHat, Ruler, Hammer, Wrench } from 'lucide-react';

export default function CreateProfessionalProfilePage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { mutate: createProfile, isPending } = useCreateProfessionalProfile();

  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState<Specialty | ''>('');
  const [experience, setExperience] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return <AccessDeniedScreen />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !specialty || !experience || !serviceDescription.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const exp = parseInt(experience);
    if (exp < 0) {
      toast.error('Experience must be a positive number');
      return;
    }

    createProfile(
      {
        name: name.trim(),
        specialty: specialty as Specialty,
        experience: BigInt(exp),
        serviceDescription: serviceDescription.trim(),
      },
      {
        onSuccess: (professionalId) => {
          toast.success('Professional profile created successfully!');
          navigate({ to: `/professionals/${professionalId}` });
        },
        onError: (error) => {
          toast.error('Failed to create profile: ' + error.message);
        },
      }
    );
  };

  const getSpecialtyIcon = (spec: string) => {
    switch (spec) {
      case 'contractor':
        return <HardHat className="h-4 w-4" />;
      case 'architect':
        return <Ruler className="h-4 w-4" />;
      case 'engineer':
        return <Wrench className="h-4 w-4" />;
      case 'carpenter':
        return <Hammer className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Create Professional Profile</CardTitle>
            <CardDescription>Showcase your skills and connect with clients looking for your expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Professional Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., John Smith Construction"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">
                  Specialty <span className="text-destructive">*</span>
                </Label>
                <Select value={specialty} onValueChange={(value) => setSpecialty(value as Specialty)}>
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Select your specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contractor">
                      <div className="flex items-center gap-2">
                        {getSpecialtyIcon('contractor')}
                        <span>Contractor</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="architect">
                      <div className="flex items-center gap-2">
                        {getSpecialtyIcon('architect')}
                        <span>Architect</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="engineer">
                      <div className="flex items-center gap-2">
                        {getSpecialtyIcon('engineer')}
                        <span>Engineer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="carpenter">
                      <div className="flex items-center gap-2">
                        {getSpecialtyIcon('carpenter')}
                        <span>Carpenter</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">
                  Years of Experience <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g., 10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceDescription">
                  Service Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="serviceDescription"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="Describe your services, expertise, certifications, and what makes you stand out..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending ? 'Creating Profile...' : 'Create Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
