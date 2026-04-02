import { Link } from '@tanstack/react-router';
import LoginButton from './LoginButton';
import { Building2, Heart } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/assets/generated/ghar-builder-logo.dim_256x256.png" alt="Ghar Builder" className="h-10 w-10" />
              <span className="text-2xl font-bold text-primary">Ghar Builder</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: 'text-primary' }}
              >
                Home
              </Link>
              <Link
                to="/projects/browse"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: 'text-primary' }}
              >
                Browse Projects
              </Link>
              <Link
                to="/professionals/browse"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: 'text-primary' }}
              >
                Find Professionals
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/projects/post"
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                    activeProps={{ className: 'text-primary' }}
                  >
                    Post Project
                  </Link>
                  <Link
                    to="/professionals/create"
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                    activeProps={{ className: 'text-primary' }}
                  >
                    Create Profile
                  </Link>
                </>
              )}
            </nav>
          </div>
          <LoginButton />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/40 bg-muted/30 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>© {new Date().getFullYear()} Ghar Builder. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-destructive fill-destructive" />
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
