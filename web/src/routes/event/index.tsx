import './event.scss';

import { Link, Outlet, useLocation } from "react-router-dom";

export const EventPage = (): JSX.Element => {
  const { pathname } = useLocation();
  const section = pathname.split('/')[pathname.split('/').length - 1];

  return (
    <>
      <header className="hero is-medium is-link">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-3">🚶Walk on Water 🌊</h1>
            <h3 className="subtitle is-4">Beta Theta Pi</h3>
            <h3 className="subtitle is-5">August 31 - 2:00pm</h3>
          </div>
        </div>
        <div className="hero-foot">
          <nav className="tabs is-fullwidth is-boxed is-centered" id="tab-bar">
            <div className="container is-max-desktop">
              <ul>
                <li className={section == 'info' ? 'is-active' : ''}><Link to="info">Information</Link></li>
                <li className={section == 'registration' ? 'is-active' : ''}><Link to="registration">Registration</Link></li>
                <li className={section == 'attendees' ? 'is-active' : ''}><Link to="attendees">Attendees</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <main className="section">
        <div className="container is-max-desktop">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default EventPage;
