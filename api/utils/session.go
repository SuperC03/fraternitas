package utils

import (
	"github.com/alexedwards/scs/v2"
	"github.com/labstack/echo/v4"
)

func SetUserSession(c echo.Context, sm *scs.SessionManager, id int) {
	sm.Put(c.Request().Context(), "user_id", id)
}

func GetUserSession(c echo.Context, sm *scs.SessionManager) int {
	return sm.GetInt(c.Request().Context(), "user_id")
}

func DeleteUserSession(c echo.Context, sm *scs.SessionManager) {
	sm.Remove(c.Request().Context(), "user_id")
}
