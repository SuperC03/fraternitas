package routes

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (rf *RouteFactory) ping(c echo.Context) error {
	return c.String(http.StatusOK, "Pong")
}
