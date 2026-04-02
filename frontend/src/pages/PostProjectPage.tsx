import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { usePostProject } from '../hooks/usePostProject';
import { Category } from '../backend';
import AccessDeniedScreen from '../components/AccessDeniedScreen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Building2, Home, Wrench } from 'lucide-react';

export default function PostProjectPage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { mutate: postProject, isPending } = usePostProject();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [category, setCategory] = useState<Category | ''>('');

  const isAuthenticated = !!identity;

  if (!isAuthenticated) {
    return <AccessDeniedScreen />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !minBudget || !maxBudget || !category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const min = parseInt(minBudget);
    const max = parseInt(maxBudget);

    if (min < 0 || max < 0) {
      toast.error('Budget values must be positive');
      return;
    }

    if (min > max) {
      toast.error('Minimum budget cannot be greater than maximum budget');
      return;
    }

    postProject(
      {
        title: title.trim(),
        description: description.trim(),
        budgetRange: [BigInt(min), BigInt(max)],
        category: category as Category,
      },
      {
        onSuccess: (projectId) => {
          toast.success('Project posted successfully!');
          navigate({ to: `/projects/${projectId}` });
        },
        onError: (error) => {
          toast.error('Failed to post project: ' + error.message);
        },
      }
    );
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'residential':
        return <Home className="h-4 w-4" />;
      case 'commercial':
        return <Building2 className="h-4 w-4" />;
      case 'renovation':
        return <Wrench className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Post a Construction Project</CardTitle>
            <CardDescription>Share your project details to connect with qualified professionals</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Project Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., 3-Bedroom House Construction"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Project Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project requirements, timeline, location, and any specific needs..."
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  Project Category <span className="text-destructive">*</span>
                </Label>
                <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon('residential')}
                        <span>Residential</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="commercial">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon('commercial')}
                        <span>Commercial</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="renovation">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon('renovation')}
                        <span>Renovation</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minBudget">
                    Minimum Budget ($) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="minBudget"
                    type="number"
                    min="0"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    placeholder="10000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxBudget">
                    Maximum Budget ($) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="maxBudget"
                    type="number"
                    min="0"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    placeholder="50000"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending ? 'Posting Project...' : 'Post Project'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
