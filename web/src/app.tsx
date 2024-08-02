import { useOktaAuth } from '@okta/okta-react';
import './app.scss';

import { OktaWrapper } from './config/okta';
import { BrowserRouter, Router, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Footer from './components/footer';
import Navbar from './components/navbar';

import HomePage from './routes/home';
import CheckInPage from './routes/checkin';
import EventPage from './routes/event';
import EventInfoPage from './routes/event/info';
import EventRegistrationPage from './routes/event/registration';
import EventAttendeesPage from './routes/event/attendees';
import OrgPage from './routes/org';
import ProfilePage from './routes/profile';
import UserPage from './routes/user';

const App = () => {
  return (
    <>
      <Navbar loggedIn={true} />
      <div id="content">
        <RouterProvider router={router} />
      </div>
      <Footer loggedIn={true} />
    </>

  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'checkin',
    element: <CheckInPage />,
  },
  {
    path: 'event/:eventId',
    element: <EventPage />,
    children: [
      {
        path: 'info',
        element: <EventInfoPage />,
      },
      {
        path: 'registration',
        element: <EventRegistrationPage />,
      },
      {
        path: 'attendees',
        element: <EventAttendeesPage />,
      }
    ]
  },
  {
    path: 'org/:orgId',
    element: <OrgPage />,
  },
  {
    path: 'profile',
    element: <ProfilePage />,
  },
  {
    path: 'user/userId',
    element: <UserPage />,
  },
]);

export default App;
