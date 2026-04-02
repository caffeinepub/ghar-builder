import { useParams, Link } from '@tanstack/react-router';
import { useGetProfessional } from '../hooks/useGetProfessional';
import { useDeleteProfessionalProfile } from '../hooks/useDeleteProfessionalProfile';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Specialty } from '../backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { HardHat, Ruler, Hammer, Wrench, ArrowLeft, Award, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export default function ProfessionalDetailPage() {
  const { id } = useParams({ from: '/professionals/$id' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: professional, isLoading } = useGetProfessional(BigInt(id));
  const { mutate: deleteProfile, isPending: isDeleting } = useDeleteProfessionalProfile();

  const isOwner = identity && professional && professional.owner.toString() === identity.getPrincipal().toString();

  const getSpecialtyIcon = (spec: Specialty) => {
    switch (spec) {
      case Specialty.contractor:
        return <HardHat className="h-6 w-6" />;
      case Specialty.architect:
        return <Ruler className="h-6 w-6" />;
      case Specialty.engineer:
        return <Wrench className="h-6 w-6" />;
      case Specialty.carpenter:
        return <Hammer className="h-6 w-6" />;
    }
  };

  const getSpecialtyLabel = (spec: Specialty) => {
    return spec.charAt(0).toUpperCase() + spec.slice(1);
  };

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this professional profile?')) {
      return;
    }

    deleteProfile(BigInt(id), {
      onSuccess: () => {
        toast.success('Profile deleted successfully');
        navigate({ to: '/professionals/browse' });
      },
      onError: (error) => {
        toast.error('Failed to delete profile: ' + error.message);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <p className="text-center text-muted-foreground">Loading professional profile...</p>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="container py-12">
        <Card className="text-center py-12">
          <CardContent>
            <HardHat className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Professional not found</p>
            <p className="text-muted-foreground mb-4">The professional profile you're looking for doesn't exist</p>
            <Button asChild>
              <Link to="/professionals/browse">Browse Professionals</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/professionals/browse">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Professionals
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-3">{professional.name}</CardTitle>
                <Badge variant="secondary" className="flex items-center gap-2 w-fit text-base px-3 py-1">
                  {getSpecialtyIcon(professional.specialty)}
                  {getSpecialtyLabel(professional.specialty)}
                </Badge>
              </div>
              {isOwner && (
                <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-3 text-lg">
              <Award className="h-6 w-6 text-primary" />
              <span className="font-semibold">{professional.experience.toString()} years of experience</span>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">About & Services</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{professional.serviceDescription}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <p className="text-sm text-muted-foreground font-mono">{professional.owner.toString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
