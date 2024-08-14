import { OktaAuth } from "@okta/okta-auth-js";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Security, useOktaAuth } from "@okta/okta-react";
import { ReactNode, useEffect } from "react";

const oktaAuth = new OktaAuth({
  issuer: import.meta.env.VITE_OIDC_ISSUER_URI,
  clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirectUri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  scopes: ["openid", "profile", "email"],
  responseType: "code",
  pkce: false
})

export const OktaWrapper = ({ children }: { children: ReactNode }) => {
  // This is mostly unimportant
  const restoreOriginalUri = async (_: any, __: string) => { };
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security >
  );
}

export const AuthRedirect = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const { oktaAuth } = useOktaAuth();

  useEffect(() => {
    searchParams.forEach((k, v) => { console.log(k, v) });
    (async () => {
      console.log("AT", oktaAuth)
    })();
    navigate('/');
  }, []);

  return "Redirecting"
}