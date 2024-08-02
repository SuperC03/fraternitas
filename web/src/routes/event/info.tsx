export const EventInfoPage = (): JSX.Element => {
  return (
    <>
      <div className="message">
        <div className="message-header">
          <h2 className="title is-5">Event Details</h2>
        </div>
        <div className="message-body">
          <p><strong>Host Organization: </strong>
            Beta Theta Pi</p>
          <p><strong>Location: </strong>
            Charles River Esplanade</p>
        </div>
      </div>
      <div className="message">
        <div className="message-header">
          <h2 className="title is-5">Event Description</h2>
        </div>
        <p className="message-body">
          "Ever felt like water's not viscous enough? Wouldn't it be cool if you could just walk on it? Well say less! Here at Beta, we chose to do just that (with the aid of giant hampster balls). Glide across the water, challenge your friends to races, and enjoy some buoyant fun! <br />
          <br />
          Burgers and hot dogs will also be available. <br />
          <br />
          Need a ride or have questions? Reach out to us at (617) 715-2762.<br />
          Location: 119 Bay State Rd, Boston<br />
          Details at: beta.mit.edu/rush"<br />
        </p>
      </div>
    </>
  )
}

export default EventInfoPage;
