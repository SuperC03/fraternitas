import './app.scss';

import { AuthRedirect } from './config/okta';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
    <BrowserRouter>
      <Navbar loggedIn={false} />
      <div id="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="mit-oauth" element={<AuthRedirect />} />
          <Route path="checkin" element={<CheckInPage />} />
          <Route path="event/:eventId" element={<EventPage />}>
            <Route path="info" element={<EventInfoPage />} />
            <Route path="registration" element={<EventRegistrationPage />} />
            <Route path="attendees" element={<EventAttendeesPage />} />
          </Route>
          <Route path="org/:orgId" element={<OrgPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="user/:userId" element={<UserPage />} />
        </Routes>
      </div>
      <Footer loggedIn={false} />
    </BrowserRouter>
  );
}

export default App;
