import { useQuery } from '@tanstack/react-query';
import './event.scss';

import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchEventInformation } from './query';
import { useEffect, useState } from 'react';

export const EventPage = (): JSX.Element => {
  const { eventId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", eventId, "information"],
    enabled: !!eventId,
    queryFn: () => fetchEventInformation(parseInt(eventId ?? "0") || 0),
  })

  const { pathname } = useLocation();
  const section = pathname.split('/')[pathname.split('/').length - 1];

  const [time, setTime] = useState<string>('');
  useEffect(() => {
    if(data) {
      setTime((new Date(data.start.slice(0, -1))).toLocaleString('en-US', {
        dateStyle: 'long', timeStyle: 'short'
      }) + " until " + (new Date(data.end.slice(0, -1))).toLocaleTimeString('en-US', {
        timeStyle: 'short'
      }));
    }
  }, [data])

  return (
    isError ? (
        <main className="hero is-large">
          <div className="hero-body">
          <h2 className="title is-3 has-text-centered">Event not Found :(</h2>
          </div>
        </main>
      ) : (
        <>
        <header className="hero is-medium is-link">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className={`title is-3 ${isLoading ? 'is-skeleton' : ''}`}>{data?.title}</h1>
              <h3 className={`subtitle is-4 ${isLoading ? 'is-skeleton' : ''}`}>{data?.org_name}</h3>
              <h3 className={`subtitle is-5 ${isLoading ? 'is-skeleton' : ''}`}>{time}</h3>
            </div>
          </div>
          <div className="hero-foot">
            <nav className="tabs is-fullwidth is-boxed is-centered" id="tab-bar">
              <div className="container is-max-desktop">
                <ul>
                  <li className={section == 'info' ? 'is-active' : ''}><Link to="info">Information</Link></li>
                  {/* <li className={section == 'registration' ? 'is-active' : ''}><Link to="registration">Registration</Link></li>
                  <li className={section == 'attendees' ? 'is-active' : ''}><Link to="attendees">Attendees</Link></li> */}
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
  )
}

export default EventPage;
