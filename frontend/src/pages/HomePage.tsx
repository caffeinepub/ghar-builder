import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, FileText, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-construction.dim_1920x600.png"
            alt="Construction"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Build Your Dream Home with Ghar Builder
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Connect with skilled construction professionals and find the perfect team for your project. From
              residential to commercial, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link to="/projects/post">Post a Project</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 text-white border-white/30">
                <Link to="/professionals/browse">Find Professionals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Ghar Builder Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're looking to hire professionals or offer your services, our platform makes it simple.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">For Project Owners</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Post Your Project</p>
                    <p className="text-sm text-muted-foreground">
                      Describe your construction needs, budget, and timeline
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Browse Professionals</p>
                    <p className="text-sm text-muted-foreground">
                      Find qualified contractors, architects, and engineers
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Connect & Build</p>
                    <p className="text-sm text-muted-foreground">Get your project done by trusted professionals</p>
                  </div>
                </div>
                <Button asChild className="w-full mt-4">
                  <Link to="/projects/post">Post a Project</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">For Professionals</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Create Your Profile</p>
                    <p className="text-sm text-muted-foreground">
                      Showcase your skills, experience, and specialties
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Browse Projects</p>
                    <p className="text-sm text-muted-foreground">Find projects that match your expertise</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Grow Your Business</p>
                    <p className="text-sm text-muted-foreground">Connect with clients and expand your portfolio</p>
                  </div>
                </div>
                <Button asChild className="w-full mt-4">
                  <Link to="/professionals/create">Create Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Categories</h2>
            <p className="text-lg text-muted-foreground">We support all types of construction projects</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Residential</CardTitle>
                <CardDescription>Homes, apartments, and residential complexes</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Commercial</CardTitle>
                <CardDescription>Offices, retail spaces, and commercial buildings</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Renovation</CardTitle>
                <CardDescription>Remodeling, repairs, and upgrades</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join Ghar Builder today and bring your construction projects to life</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/projects/browse">Browse Projects</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30">
              <Link to="/professionals/browse">Find Professionals</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
