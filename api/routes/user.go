package routes

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/superc03/fraternitas/api/utils"
)

func (rf *RouteFactory) userImage(c echo.Context) error {
	img, _ := utils.MitGetUserImage(
		c.Request().Context(),
		rf.env.MitApiImageUrl,
		rf.env.MitApiClientId,
		rf.env.MitApiClientSecret,
		"tim",
	)
	// Cache this for a week
	c.Response().Header().Add("Cache-Control", "private, max-age=604800, immutable")
	return c.Stream(http.StatusOK, "image/png", img)
}
