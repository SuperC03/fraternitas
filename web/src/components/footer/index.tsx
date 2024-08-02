import './footer.scss';

interface FooterProps {
  loggedIn: boolean;
}

export const Footer = ({ loggedIn }: FooterProps): JSX.Element => {
  return (
    <>
      <footer className="footer">
        <div className="content has-text-centered">
          Powered by <b>Fraternitas v1.0</b><br />
          <a href="mailto:fraternitus@mit.edu" target="_blank">Contact Us</a>
        </div>
      </footer>
      {loggedIn ? <div className="is-hidden-tablet" id="footer-spacer"></div> : null}
    </>
  )
}

export default Footer;
