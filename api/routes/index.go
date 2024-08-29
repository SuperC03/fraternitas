package routes

import (
	"github.com/alexedwards/scs/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/labstack/echo/v4"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog"
	"github.com/superc03/fraternitas/api/config"
	"github.com/superc03/fraternitas/api/data"
)

type RouteFactory struct {
	env            *config.EnvConfig
	logger         *zerolog.Logger
	db             *pgxpool.Pool
	query          *data.Queries
	redis          *redis.Client
	sessionManager *scs.SessionManager
}

func (rf *RouteFactory) RegisterRoutes(
	e *echo.Echo,
) {
	// Overview Routes
	overviewRoutesGroup := e.Group("/overview")
	overviewRoutesGroup.GET("", rf.overview)

	// Event Routes
	eventRoutesGroup := e.Group("/event/:id")
	eventRoutesGroup.GET("/information", rf.eventInformation)

	// Auth Routes
	authRoutesGroup := e.Group("/auth")
	authRoutesGroup.GET("/whoami", rf.whoami)
	authRoutesGroup.POST("/login/mit-oidc", rf.loginWithMitOIDC)
	authRoutesGroup.POST("/logout", rf.logout)

	// User Routes
	userRoutesGroup := e.Group("/user")
	userRoutesGroup.GET("/:kerb/image", rf.userImage)

	// Other Routes
	otherRoutesGroup := e.Group("")
	otherRoutesGroup.GET("/ping", rf.ping)
}

func NewRouteFactory(
	env *config.EnvConfig,
	logger *zerolog.Logger,
	db *pgxpool.Pool,
	redis *redis.Client,
	sessionManager *scs.SessionManager,
) *RouteFactory {
	return &RouteFactory{
		env, logger, db, data.New(db), redis, sessionManager,
	}
}
