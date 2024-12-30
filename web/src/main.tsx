import { MantineProvider } from '@mantine/core';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { OktaWrapper } from './config/okta';

import '@mantine/core/styles.css';

import { routeTree } from './routeTree.gen';

// Tanstack Router Init
const router = createRouter({ routeTree });
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider>
        <OktaWrapper>
          <RouterProvider router={router} />
        </OktaWrapper>
      </MantineProvider>
    </StrictMode>,
  );
}
