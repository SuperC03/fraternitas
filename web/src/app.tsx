import { useOktaAuth } from '@okta/okta-react';
import './app.scss';

import { OktaWrapper } from './config/okta';
import { BrowserRouter, Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Footer from './components/footer';



const App = () => {
  return (
    <Footer />
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  }
]);

export default () => <RouterProvider router={router} />
