import { OktaAuth } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import type { RestoreOriginalUriFunction } from '@okta/okta-react/bundles/types/OktaContext';

const oktaAuth = new OktaAuth({
  issuer: import.meta.env.VITE_OIDC_ISSUER_URI,
  clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirectUri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  scopes: ['openid', 'profile', 'email'],
  responseType: 'code',
  pkce: false,
});

export const OktaWrapper = ({ children }: { children: JSX.Element }) => {
  // This is mostly unimportant
  const restoreOriginalUri: RestoreOriginalUriFunction = async (_, __) => {};
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
  );
};
