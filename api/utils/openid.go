package utils

import (
	"context"
	"fmt"
	"strings"

	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/superc03/fraternitas/api/config"
	"golang.org/x/oauth2"
)

func OidcAuthCodeToKerb(
	ctx context.Context,
	env config.EnvConfig,
	authorizationCode string,
) (string, error) {
	provider, err := oidc.NewProvider(ctx, env.OidcIssuerUri)
	if err != nil {
		return "", fmt.Errorf("Unable to create OIDC Provider: %w", err)
	}
	oauth2Config := oauth2.Config{
		RedirectURL:  env.OidcRedirectUri,
		ClientID:     env.OidcClientId,
		ClientSecret: env.OidcClientSecret,
		Endpoint:     provider.Endpoint(),
		Scopes:       []string{oidc.ScopeOpenID, "profile", "email"},
	}
	verifier := provider.Verifier(&oidc.Config{ClientID: env.OidcClientId})
	oauth2Token, err := oauth2Config.Exchange(ctx, authorizationCode)
	if err != nil {
		return "", fmt.Errorf("Unable to exchange OIDC Authorization Code: %w", err)
	}
	rawIdToken, ok := oauth2Token.Extra("id_token").(string)
	if !ok {
		return "", fmt.Errorf("Unable to extract ID Token from OAuth2 Token: %w", err)
	}
	idToken, err := verifier.Verify(ctx, rawIdToken)
	if err != nil {
		return "", fmt.Errorf("Unable to verify OAuth2 ID Token: %w", err)
	}
	var claims struct {
		Email string `json:"email"`
	}
	if err := idToken.Claims(&claims); err != nil {
		return "", fmt.Errorf("Email not present in OAuth2 Claims (theoretically meaning an incorrect account type?): %w", err)
	}
	if !strings.Contains(claims.Email, "@mit.edu") {
		return "", fmt.Errorf("Improper email (%s) returned from OAuth2 Claims: %w", claims.Email, err)
	}
	return strings.Split(claims.Email, "@mit.edu")[0], nil
}
