export const EventRegistrationPage = (): JSX.Element => {
  return (
    <>
      <div className="message">
        <div className="message-header">
          <h2 className="title is-5">Registration Stats</h2>
        </div>
        <div className="message-body">
          <p><strong>Registration Count: </strong>3</p>
        </div>
      </div>
      {/* <div className="message">
        <div className="message-header">
          <h2 className="title is-5">Registrations</h2>
        </div>
        <div className="message-body"> */}
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Smith</td>
            <td>1234567890</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>1234567890</td>
          </tr>
          <tr>
            <td>Jill Smith</td>
            <td>1234567890</td>
          </tr>
          <tr>
            <td>Joe Smith</td>
            <td>1234567890</td>
          </tr>
        </tbody>
      </table>
      {/* </div>
      </div> */}
    </>
  )
}

export default EventRegistrationPage;
