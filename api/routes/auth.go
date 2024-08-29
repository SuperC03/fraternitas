package routes

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
	"github.com/superc03/fraternitas/api/utils"
)

func (rf *RouteFactory) whoami(c echo.Context) error {
	id := utils.GetUserSession(c, rf.sessionManager)
	if id == 0 {
		return c.String(http.StatusUnauthorized, "Not logged in")
	}
	rf.logger.Info().Int("user_id", id).Msg("User ID found!")
	return c.String(http.StatusOK, "Hello X")
}

type loginWithMitOIDCParams struct {
	Code string `json:"code"`
}

func (rf *RouteFactory) loginWithMitOIDC(c echo.Context) error {
	var data loginWithMitOIDCParams
	if err := c.Bind(&data); err != nil {
		return c.String(http.StatusBadRequest, "Value for `code` must be provided in JSON body")
	}
	if len(data.Code) <= 0 {
		return c.String(http.StatusBadRequest, "Value for `code` must not be empty")
	}
	kerb, err := utils.OidcAuthCodeToKerb(c.Request().Context(), *rf.env, data.Code)
	if err != nil {
		rf.logger.Warn().Str("code", data.Code).Err(err).Msg("Failed attempt to resolve OIDC code")
		return c.String(http.StatusUnauthorized, "Invalid OpenID code provided")
	}
	_, err = rf.query.GetUserByKerb(c.Request().Context(), "sdgsdfgsdfg")
	if err != nil && errors.Is(err, pgx.ErrNoRows) {
		info, err := utils.MitGetUser(c.Request().Context(), rf.env.MitApiPeopleUrl, rf.env.MitApiClientId, rf.env.MitApiClientSecret, kerb)
		if err != nil {
			rf.logger.Warn().Str("kerb", kerb).Err(err).Msg("Unable to query MIT People API")
			return c.NoContent(http.StatusInternalServerError)
		}
		fmt.Println(info)
	} else if err != nil {
		rf.logger.Warn().Str("kerb", kerb).Err(err).Msg("Unable to query for existing users")
		return c.NoContent(http.StatusInternalServerError)
	}
	utils.SetUserSession(c, rf.sessionManager, 69)
	c.String(http.StatusOK, kerb)
	return c.NoContent(http.StatusNotImplemented)
}

func (rf *RouteFactory) logout(c echo.Context) error {
	utils.DeleteUserSession(c, rf.sessionManager)
	return c.NoContent(http.StatusOK)
}
