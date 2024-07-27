import { useOktaAuth } from '@okta/okta-react';
import './app.scss';

import { OktaWrapper } from './config/okta';
import { BrowserRouter, Router, RouterProvider, createBrowserRouter } from 'react-router-dom';



const App = () => {
  const { oktaAuth } = useOktaAuth();

  return (
    <>
      <button onClick={async () => oktaAuth.signInWithRedirect()}>Login</button>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <OktaWrapper><App /></OktaWrapper>,
  }
]);

export default () => <RouterProvider router={router} />
