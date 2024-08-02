export const EventAttendeesPage = (): JSX.Element => {
  return (
    <>
      <div className="message">
        <div className="message-header">
          <h2 className="title is-5">Registration Stats</h2>
        </div>
        <div className="message-body">
          <p><strong>Attendance Count: </strong>3</p>
        </div>
      </div>
      <div className="fixed-grid has-2-cols-mobile has-3-cols-tablet has-4-cols-desktop">
        <div className="grid">
          <div className="cell">
            <div className="card">
              <div className="card-image">
                <figure className="image">
                  <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Placeholder" />
                </figure>
              </div>
              <div className="card-content has-text-centered">
                <h3 className="title is-4">John Smith</h3>
                <h5 className="subtitle is-6">1234567890</h5>
              </div>
            </div>
          </div>
          <div className="cell">
            <div className="card">
              <div className="card-image">
                <figure className="image">
                  <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Placeholder" />
                </figure>
              </div>
              <div className="card-content has-text-centered">
                <h3 className="title is-4">John Smith</h3>
                <h5 className="subtitle is-6">1234567890</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventAttendeesPage;
