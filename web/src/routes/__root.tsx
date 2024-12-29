import { AppShell } from '@mantine/core';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Footer from '../components/footer';

const RootRoute = () => {
  return (
    <>
      <AppShell>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
        <Footer />
      </AppShell>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: RootRoute,
});
