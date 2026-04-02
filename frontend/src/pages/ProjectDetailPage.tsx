import { useParams, Link } from '@tanstack/react-router';
import { useGetProject } from '../hooks/useGetProject';
import { useDeleteProject } from '../hooks/useDeleteProject';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Category } from '../backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, Home, Wrench, DollarSign, ArrowLeft, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export default function ProjectDetailPage() {
  const { id } = useParams({ from: '/projects/$id' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: project, isLoading } = useGetProject(BigInt(id));
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const isOwner = identity && project && project.owner.toString() === identity.getPrincipal().toString();

  const getCategoryIcon = (cat: Category) => {
    switch (cat) {
      case Category.residential:
        return <Home className="h-5 w-5" />;
      case Category.commercial:
        return <Building2 className="h-5 w-5" />;
      case Category.renovation:
        return <Wrench className="h-5 w-5" />;
    }
  };

  const getCategoryLabel = (cat: Category) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const formatBudget = (amount: bigint) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
      Number(amount)
    );
  };

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    deleteProject(BigInt(id), {
      onSuccess: () => {
        toast.success('Project deleted successfully');
        navigate({ to: '/projects/browse' });
      },
      onError: (error) => {
        toast.error('Failed to delete project: ' + error.message);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <p className="text-center text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container py-12">
        <Card className="text-center py-12">
          <CardContent>
            <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Project not found</p>
            <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist</p>
            <Button asChild>
              <Link to="/projects/browse">Browse Projects</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/projects/browse">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">{project.title}</CardTitle>
                <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                  {getCategoryIcon(project.category)}
                  {getCategoryLabel(project.category)}
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
            <div>
              <h3 className="text-lg font-semibold mb-2">Project Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Budget Range</h3>
              <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                <DollarSign className="h-6 w-6" />
                <span>
                  {formatBudget(project.budgetRange[0])} - {formatBudget(project.budgetRange[1])}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-2">Project Owner</h3>
              <p className="text-sm text-muted-foreground font-mono">{project.owner.toString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
