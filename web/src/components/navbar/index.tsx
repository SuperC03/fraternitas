import { useOktaAuth } from "@okta/okta-react";
import BottomBar from "./bottom"

import "./navbar.scss";
import { Link } from "react-router-dom";

export interface NavbarProps {
  loggedIn: boolean
}

export const Navbar = ({ loggedIn }: NavbarProps): JSX.Element => {
  const { oktaAuth } = useOktaAuth();

  return (
    <>
      <nav className="navbar is-fixed-top" aria-label="primary navigation" role="navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link to="/">
              <h1 className="has-text-weight-bold is-capitalized is-size-3 has-text-white">IFC Rush 2024</h1>
            </Link>
          </div>
          <div className="navbar-burger">
            {loggedIn ? (
              <button className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </button>
            ) : (
              <button className="icon" onClick={()=>oktaAuth.signInWithRedirect()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            {loggedIn ? (
              <div className="navbar-item">
                <button className="button is-danger">Logout</button>
              </div>
            ) : (
              <div className="navbar-item">
                <button className="button is-primary" onClick={() => oktaAuth.signInWithRedirect()}>Login</button>
              </div>
            )}
          </div>
        </div >
      </nav >
      {loggedIn ? <BottomBar /> : null}
    </>
  );
}

export default Navbar;