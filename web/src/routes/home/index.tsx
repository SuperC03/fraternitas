import { useQuery } from '@tanstack/react-query';
import './home.scss';
import { fetchOverview, FetchOverviewProps } from './query';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EventBlock from './block';

export const HomePage = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<FetchOverviewProps>();

  useEffect(() => {
    const orgId = parseInt(searchParams.get('orgId') ?? '');
    setQueryParams({
      orgId: isNaN(orgId) ? undefined : orgId,
      after: searchParams.get('after') ?? undefined,
      category: searchParams.get('category') ?? undefined,
    });
  }, [])

  const { data, isLoading } = useQuery({
    queryFn: () => fetchOverview(queryParams),
    queryKey: ['overview', queryParams],
    enabled: !!queryParams,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <header className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1">IFC Rush 2024</h1>
          </div>
        </div>
        <div className="hero-footer p-4">
          <div className="container is-max-desktop">
            <form className="columns is-mobile is-multiline">
              <div className="column is-half-mobile is-one-quarted-tablet">
                <div className="control">
                  <div className="select is-medium is-fullwidth">
                    <select name="date">
                      <option>All Events</option>
                      <option>Today's Events</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="column is-half-mobile is-one-quarted-tablet">
                <div className="control">
                  <div className="select is-medium is-fullwidth">
                    <select name="date">
                      <option>All Groups</option>
                      <option>Beta Theta Pi</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="column is-half-mobile is-one-quarted-tablet">
                <div className="control">
                  <div className="select is-medium is-fullwidth">
                    <select name="category">
                      <option>All Categories</option>
                      <option>Jaunts</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="column is-half-mobile is-one-quarted-tablet">
                <button type="submit" className="is-medium button is-fullwidth">Submit</button>
              </div>
            </form>
          </div>

        </div>
      </header>
      <main className="section">
        <div className="container is-max-desktop">
          <div className="fixed-grid has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop">
            <div className="grid">
              {isLoading ? (
                // Generate five skeleton blocks
                Array.from({length: 5}, (_, i) => i).map(i => (
                  <div className="cell" key={i}>
                    <div className="notification is-skeleton">Lorem ipsum dolor sit amet consectetur</div>
                  </div>
                ))
              ) : data?.events.map(e => <EventBlock {...e} />)}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomePage;
