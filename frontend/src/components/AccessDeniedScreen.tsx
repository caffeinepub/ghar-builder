import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function AccessDeniedScreen() {
  const { login, loginStatus } = useInternetIdentity();

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-12rem)] py-12">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Authentication Required</CardTitle>
          <CardDescription>You need to be logged in to access this page.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Please log in with your Internet Identity to post projects, create professional profiles, and access other
            features.
          </p>
          <Button onClick={login} disabled={loginStatus === 'logging-in'} size="lg" className="w-full">
            {loginStatus === 'logging-in' ? 'Logging in...' : 'Login to Continue'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
