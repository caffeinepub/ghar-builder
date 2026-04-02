import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import PostProjectPage from './pages/PostProjectPage';
import BrowseProjectsPage from './pages/BrowseProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CreateProfessionalProfilePage from './pages/CreateProfessionalProfilePage';
import BrowseProfessionalsPage from './pages/BrowseProfessionalsPage';
import ProfessionalDetailPage from './pages/ProfessionalDetailPage';
import Layout from './components/Layout';
import ProfileSetupModal from './components/ProfileSetupModal';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <ProfileSetupModal />
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const postProjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/post',
  component: PostProjectPage,
});

const browseProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/browse',
  component: BrowseProjectsPage,
});

const projectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/$id',
  component: ProjectDetailPage,
});

const createProfessionalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/professionals/create',
  component: CreateProfessionalProfilePage,
});

const browseProfessionalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/professionals/browse',
  component: BrowseProfessionalsPage,
});

const professionalDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/professionals/$id',
  component: ProfessionalDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  postProjectRoute,
  browseProjectsRoute,
  projectDetailRoute,
  createProfessionalRoute,
  browseProfessionalsRoute,
  professionalDetailRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
