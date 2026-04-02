import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useBrowseProfessionals } from '../hooks/useBrowseProfessionals';
import { Specialty } from '../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HardHat, Ruler, Hammer, Wrench, Filter, Award } from 'lucide-react';

export default function BrowseProfessionalsPage() {
  const [specialtyFilter, setSpecialtyFilter] = useState<Specialty | null>(null);
  const [minExperienceFilter, setMinExperienceFilter] = useState('');

  const { data: professionals, isLoading } = useBrowseProfessionals(
    specialtyFilter,
    minExperienceFilter ? BigInt(minExperienceFilter) : null
  );

  const getSpecialtyIcon = (spec: Specialty) => {
    switch (spec) {
      case Specialty.contractor:
        return <HardHat className="h-4 w-4" />;
      case Specialty.architect:
        return <Ruler className="h-4 w-4" />;
      case Specialty.engineer:
        return <Wrench className="h-4 w-4" />;
      case Specialty.carpenter:
        return <Hammer className="h-4 w-4" />;
    }
  };

  const getSpecialtyLabel = (spec: Specialty) => {
    return spec.charAt(0).toUpperCase() + spec.slice(1);
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Find Construction Professionals</h1>
        <p className="text-lg text-muted-foreground">Connect with skilled contractors, architects, engineers, and more</p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Professionals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialty-filter">Specialty</Label>
              <Select
                value={specialtyFilter || 'all'}
                onValueChange={(value) => setSpecialtyFilter(value === 'all' ? null : (value as Specialty))}
              >
                <SelectTrigger id="specialty-filter">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="contractor">
                    <div className="flex items-center gap-2">
                      <HardHat className="h-4 w-4" />
                      <span>Contractor</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="architect">
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4" />
                      <span>Architect</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="engineer">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      <span>Engineer</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="carpenter">
                    <div className="flex items-center gap-2">
                      <Hammer className="h-4 w-4" />
                      <span>Carpenter</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-experience">Minimum Experience (years)</Label>
              <Input
                id="min-experience"
                type="number"
                min="0"
                value={minExperienceFilter}
                onChange={(e) => setMinExperienceFilter(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professionals Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading professionals...</p>
        </div>
      ) : professionals && professionals.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((professional) => (
            <Card key={professional.id.toString()} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-xl line-clamp-1">{professional.name}</CardTitle>
                  <Badge variant="secondary" className="flex items-center gap-1 flex-shrink-0">
                    {getSpecialtyIcon(professional.specialty)}
                    {getSpecialtyLabel(professional.specialty)}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-3">{professional.serviceDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Award className="h-4 w-4" />
                  <span className="font-medium">{professional.experience.toString()} years experience</span>
                </div>
                <Button asChild className="w-full">
                  <Link to={`/professionals/$id`} params={{ id: professional.id.toString() }}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <HardHat className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">No professionals found</p>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or check back later</p>
            <Button asChild>
              <Link to="/professionals/create">Create Profile</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
