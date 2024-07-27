import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { BrowserRouter as Router, Route, useNavigate } from 'react-router-dom';
import { Security } from "@okta/okta-react";
import { ReactNode } from "react";

const oktaAuth = new OktaAuth({
  issuer: '',
  clientId: '',
  redirectUri: 'http://localhost:5173/mit-oauth',
})

export const OktaWrapper = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const restoreOriginalUri = async (_: any, originalUri: string) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  );
}