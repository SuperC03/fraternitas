import { OktaAuth } from "@okta/okta-auth-js";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Security } from "@okta/okta-react";
import { ReactNode, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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

const loginUserWithOidcCode =
    async (code: string): Promise<any> => {
        const res = await axios.post<any>(
            import.meta.env.VITE_API_URI + "/auth/login/mit-oidc",
            { code }
        )
        return res.data
    }

export const AuthRedirect = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const queryClient = useQueryClient();
  const login = useMutation({
    mutationFn: loginUserWithOidcCode,
    onSuccess: (data) => {
      console.log(data);
      queryClient.getQueryCache();
    },
    onError: (err) => {
      console.error(err);
    }
  });

  useEffect(() => {
    const code = searchParams.get('code');
    if(code) {
      searchParams.delete('code');
      login.mutate(code);
      navigate('/');
    }
  }, []);

  return "Redirecting"
}