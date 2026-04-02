import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useBrowseProjects } from '../hooks/useBrowseProjects';
import { Category } from '../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Home, Wrench, DollarSign, Filter } from 'lucide-react';

export default function BrowseProjectsPage() {
  const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);
  const [minBudgetFilter, setMinBudgetFilter] = useState('');
  const [maxBudgetFilter, setMaxBudgetFilter] = useState('');

  const { data: projects, isLoading } = useBrowseProjects(
    categoryFilter,
    minBudgetFilter ? BigInt(minBudgetFilter) : null,
    maxBudgetFilter ? BigInt(maxBudgetFilter) : null
  );

  const getCategoryIcon = (cat: Category) => {
    switch (cat) {
      case Category.residential:
        return <Home className="h-4 w-4" />;
      case Category.commercial:
        return <Building2 className="h-4 w-4" />;
      case Category.renovation:
        return <Wrench className="h-4 w-4" />;
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

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Browse Construction Projects</h1>
        <p className="text-lg text-muted-foreground">Find projects that match your expertise</p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category-filter">Category</Label>
              <Select
                value={categoryFilter || 'all'}
                onValueChange={(value) => setCategoryFilter(value === 'all' ? null : (value as Category))}
              >
                <SelectTrigger id="category-filter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="residential">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <span>Residential</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="commercial">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>Commercial</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="renovation">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      <span>Renovation</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-budget">Min Budget ($)</Label>
              <Input
                id="min-budget"
                type="number"
                min="0"
                value={minBudgetFilter}
                onChange={(e) => setMinBudgetFilter(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-budget">Max Budget ($)</Label>
              <Input
                id="max-budget"
                type="number"
                min="0"
                value={maxBudgetFilter}
                onChange={(e) => setMaxBudgetFilter(e.target.value)}
                placeholder="Any"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id.toString()} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-xl line-clamp-2">{project.title}</CardTitle>
                  <Badge variant="secondary" className="flex items-center gap-1 flex-shrink-0">
                    {getCategoryIcon(project.category)}
                    {getCategoryLabel(project.category)}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-3">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium">
                    {formatBudget(project.budgetRange[0])} - {formatBudget(project.budgetRange[1])}
                  </span>
                </div>
                <Button asChild className="w-full">
                  <Link to={`/projects/$id`} params={{ id: project.id.toString() }}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">No projects found</p>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or check back later</p>
            <Button asChild>
              <Link to="/projects/post">Post a Project</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
