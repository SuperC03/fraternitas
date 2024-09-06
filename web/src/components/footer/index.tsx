import './footer.scss';

interface FooterProps {
  loggedIn: boolean;
}

export const Footer = ({ loggedIn }: FooterProps): JSX.Element => {
  return (
    <>
      <footer className="footer">
        <div className="content has-text-centered">
          Powered by <a target="_blank" href="https://github.com/SuperC03/fraternitas">Fraternitas v1.0</a><br />
          <a href="https://accessibility.mit.edu/" target="_blank">Accessibility Notice</a>
          {" - "}
          <a href="mailto:fraternitas@mit.edu" target="_blank">Contact Us</a>
        </div>
      </footer>
      {loggedIn ? <div className="is-hidden-tablet" id="footer-spacer"></div> : null}
    </>
  )
}

export default Footer;
