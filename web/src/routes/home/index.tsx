import './home.scss';

export const HomePage = (): JSX.Element => {
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
                <button type="submit" className="is-medium button is-fullwidth">Search</button>
              </div>
            </form>
          </div>

        </div>
      </header>
      <main className="section">
        <div className="container is-max-desktop">

        </div>
      </main>
    </>
  )
}

export default HomePage;
