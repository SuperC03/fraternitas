import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import Footer from '../components/footer';
import Navigation from '../components/navigation';

const RootRoute = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <Navigation opened={opened} toggle={toggle} />
        <AppShell.Main>
          <div style={{ minHeight: '80vh' }}>
            <Outlet />
          </div>
          <Footer />
        </AppShell.Main>
      </AppShell>
      {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
    </>
  );
};

export const Route = createRootRoute({
  component: RootRoute,
});
