package config

import (
	"fmt"
	"net/http"

	"github.com/alexedwards/scs/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog"
)

func EchoInit(
	env *EnvConfig,
	logger *zerolog.Logger,
	db *pgxpool.Pool,
	redis *redis.Client,
) (*http.Server, *echo.Echo, *scs.SessionManager) {
	e := echo.New()

	echoCorsInit(e, env)
	echoLoggerInit(e, logger)

	s := &http.Server{
		Addr:    fmt.Sprintf("%s:%s", env.ServerHost, env.ServerPort),
		Handler: e,
	}
	sessionManager := SessionInit(env, e, db)

	return s, e, sessionManager
}

func echoCorsInit(e *echo.Echo, env *EnvConfig) {
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{env.CorsAllowOrgin},
	}))
}

func echoLoggerInit(e *echo.Echo, logger *zerolog.Logger) {
	// Use Echo Logger
	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogURI:    true,
		LogStatus: true,
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			logger.Info().
				Str("URI", v.URI).
				Int("status", v.Status).
				Msg("request")

			return nil
		},
	}))
}
