package routes

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
	"github.com/superc03/fraternitas/api/data"
)

type OverviewData struct {
	OrgId    int32  `query:"orgId"`
	Category string `query:"category"`
	After    string `query:"after"`
}

type OverviewResponse struct {
	Events    []data.GetEventsOverviewRow `json:"events"`
	Orgs      []data.GetOrgsOverviewRow   `json:"orgs"`
	Dates     []pgtype.Date               `json:"dates"`
	Datetimes []pgtype.Timestamp          `json:"datetimes"`
}

func (rf *RouteFactory) overview(c echo.Context) error {
	var queryParams OverviewData
	if err := c.Bind(&queryParams); err != nil {
		return c.String(http.StatusBadRequest, "Invalid query params")
	}
	// Give a default date if empty
	if queryParams.After == "" {
		queryParams.After = "1991-01-01"
	}

	eventRows, err := rf.query.GetEventsOverview(c.Request().Context(), data.GetEventsOverviewParams{
		OrgID:    queryParams.OrgId,
		Category: queryParams.Category,
		After:    queryParams.After,
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

	dateRows, err := rf.query.GetDatesOverview(c.Request().Context())
	if err != nil {
		rf.logger.Warn().Err(err).Msg("Unable to query all dates")
		return c.NoContent(http.StatusInternalServerError)
	}

	datetimeRows, err := rf.query.GetDatetimesOverview(c.Request().Context())
	if err != nil {
		rf.logger.Warn().Err(err).Msg("Unable to query all datetimes")
		return c.NoContent(http.StatusInternalServerError)
	}

	res := OverviewResponse{
		Events:    append([]data.GetEventsOverviewRow{}, eventRows...),
		Orgs:      append([]data.GetOrgsOverviewRow{}, orgRows...),
		Dates:     append([]pgtype.Date{}, dateRows...),
		Datetimes: append([]pgtype.Timestamp{}, datetimeRows...),
	}
	return c.JSON(http.StatusOK, res)
}
