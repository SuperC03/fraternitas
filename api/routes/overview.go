package routes

import (
	"net/http"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/superc03/fraternitas/api/data"
)

type OverviewData struct {
	OrgId    int32     `query:"orgId"`
	Category string    `query:"category"`
	After    time.Time `query:"after"`
}

type OverviewResponse struct {
	Events []data.GetEventsOverviewRow `json:"events"`
	Orgs   []data.GetOrgsOverviewRow   `json:"orgs"`
}

func (rf *RouteFactory) overview(c echo.Context) error {
	var queryParams OverviewData
	if err := c.Bind(&queryParams); err != nil {
		return c.String(http.StatusBadRequest, "Invalid query params")
	}

	eventRows, err := rf.query.GetEventsOverview(c.Request().Context(), data.GetEventsOverviewParams{
		OrgID:    queryParams.OrgId,
		Category: strings.ToUpper(queryParams.Category),
		After:    pgtype.Date{Time: queryParams.After},
	})
	if err != nil {
		rf.logger.Warn().Interface("params", queryParams).Err(err).Msg("Unable to query events overview")
		return c.NoContent(http.StatusInternalServerError)
	}

	orgRows, err := rf.query.GetOrgsOverview(c.Request().Context())
	if err != nil {
		rf.logger.Warn().Err(err).Msg("Unable to query all orgs")
		return c.NoContent(http.StatusInternalServerError)
	}

	res := OverviewResponse{
		Events: append([]data.GetEventsOverviewRow{}, eventRows...),
		Orgs:   append([]data.GetOrgsOverviewRow{}, orgRows...),
	}
	return c.JSON(http.StatusOK, res)
}
