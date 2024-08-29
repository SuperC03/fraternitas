package routes

import (
	"errors"
	"net/http"

	"github.com/jackc/pgx/v5"
	"github.com/labstack/echo/v4"
)

type EventData struct {
	Id int32 `param:"id"`
}

func (rf *RouteFactory) eventInformation(c echo.Context) error {
	var pathParams EventData
	if err := c.Bind(&pathParams); err != nil {
		return c.String(http.StatusBadRequest, "Invalid path params")
	}

	eventInfo, err := rf.query.GetEventInformation(c.Request().Context(), pathParams.Id)
	if err != nil && errors.Is(err, pgx.ErrNoRows) {
		return c.String(http.StatusNotFound, "Event not found")
	}

	return c.JSON(http.StatusOK, eventInfo)
}
