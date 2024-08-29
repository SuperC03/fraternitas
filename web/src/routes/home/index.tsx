import { useQuery } from '@tanstack/react-query';
import './home.scss';
import { fetchOverview, FetchOverviewProps, FetchOverviewResponseEvent } from './query';
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
    setTimeSearchParam(searchParams.get('after') ?? undefined);
    setGroupSearchParam(isNaN(orgId) ? undefined : orgId);
    setCategorySearchParam(searchParams.get('category') ?? undefined);
  }, []);

  const { data, isLoading } = useQuery({
    queryFn: () => fetchOverview(queryParams),
    queryKey: ['overview', queryParams],
    enabled: !!queryParams,
    refetchOnWindowFocus: false,
  });


  const [timeSearchParam, setTimeSearchParam] = useState<string | undefined>(undefined);
  const [groupSearchParam, setGroupSearchParam] = useState<number | undefined>(undefined);
  const [categorySearchParam, setCategorySearchParam] = useState<string | undefined>(undefined);
  const handleQueryParamsUpdate = (e: any) => {
    e.preventDefault();
    setQueryParams({
      ...queryParams,
      after: timeSearchParam,
      category: categorySearchParam,
      orgId: groupSearchParam,
    });
    if (timeSearchParam) {
      searchParams.set('after', timeSearchParam);
    } else {
      searchParams.delete('after');
    }
    if (categorySearchParam) {
      searchParams.set('category', categorySearchParam);
    } else {
      searchParams.delete('category');
    }
    if (groupSearchParam) {
      searchParams.set('orgId', groupSearchParam.toString());
    } else {
      searchParams.delete('orgId');
    }
    setSearchParams(searchParams);
  }

  // TODO This should probably be handled on the backend in the future, hopefully nobody's iPod shuffle breaks
  const [ filteredEvents, setFilteredEvents ] = useState<Map<string, Map<string, Array<FetchOverviewResponseEvent>>>>(new Map());
  useEffect(() => {
    const out = new Map()
    if(data?.events && data.events.length > 0) {
      for(const e of data.events) {
        // TODO used to remove the UTC `Z` messing up the timing 
        const date = new Date(e.start.slice(0, -1));
        // TODO Should def change this later
        const day = date.toLocaleDateString('en-US', {dateStyle: 'long'});
        const time = date.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'});
        if(!out.has(day)) {
          out.set(day, new Map());  
        }
        if(!out.get(day)?.has(time)) {
          out.get(day)?.set(time, []);
        }
        out.get(day)?.get(time)?.push(e);
      }
    }
    setFilteredEvents(out);
  }, [data])

  return (
    <>
      <header className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-2">Event Schedule</h1>
          </div>
        </div>
        <div className="hero-footer p-4">
          <div className="container is-max-desktop">
            <form className="columns is-mobile is-multiline" onSubmit={handleQueryParamsUpdate}>
              <div className="column is-half-mobile is-one-quarted-tablet">
                <div className="control">
                  <div className="select is-medium is-fullwidth">
                    <select name="after" value={timeSearchParam} onChange={e => setTimeSearchParam(e.target.value || undefined)}>
                      <option value="">All Events</option>
                      <option value={(new Intl.DateTimeFormat('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'})).format()}>Today</option>
                      {data?.dates?.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="column is-half-mobile is-one-quarted-tablet">
                <div className="control">
                  <div className="select is-medium is-fullwidth">
                    {/* @ts-ignore */}
                    <select name="orgId" value={groupSearchParam} onChange={e => setGroupSearchParam(e.target.value || undefined)}>
                      <option value="">All Groups</option>
                      {data?.orgs?.map(o => (
                        <option key={o.id} value={o.id}>{o.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="column is-half-mobile is-one-quarted-tablet">
                <div className="control">
                  <div className="select is-medium is-fullwidth">
                    <select name="category" value={categorySearchParam} onChange={e => setCategorySearchParam(e.target.value || undefined)}>
                      <option value="">All Categories</option>
                      <option value="Excursion">Excursion</option>
                      <option value="Meal">Meal</option>
                      <option value="Party">Party</option>
                      <option value="Hangout">Hang Out</option>
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
        {isLoading ? (
            <div className="fixed-grid has-1-cols-mobile has-3-cols-tablet">
              <div className="grid">
                {Array.from({length: 5}, (_, i) => i).map(i => (
                        <div className="cell" key={i}>
                          <div className="notification is-skeleton">Lorem ipsum dolor sit amet consectetur</div>
                        </div>
                  ))}
              </div>
            </div>
          ) : !data?.events.length ? (
            <h3 className="has-text-centered title is-3">No Events Found</h3>
          ) : (
            Array.from(filteredEvents.entries()).map(([date, datedEvents]) => (<>
              <h3 key={date+"-title"} className="title is-3">{date}</h3>
              {Array.from(datedEvents).map(([time, timedEvents]) => (<>
                  <div key={time+"-title"} className="subtitle is-5 divider is-left">{time}</div>
                  <div key={time+"-grid"} className="fixed-grid has-1-cols-mobile has-3-cols-tablet">
                    <div className="grid">
                      {timedEvents.map(e => <div key={e.id} className="cell px-3 py-3"><EventBlock {...e} /></div>)}
                    </div>
                  </div>
                </>))}
              </>)
          )
            )}
        </div>
      </main>
    </>
  )
}

export default HomePage;
