package config

import (
	"time"

	"github.com/alexedwards/scs/pgxstore"
	"github.com/alexedwards/scs/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/labstack/echo/v4"
	session "github.com/spazzymoto/echo-scs-session"
)

func SessionInit(env *EnvConfig, e *echo.Echo, db *pgxpool.Pool) *scs.SessionManager {
	var sessionManager = scs.New()
	sessionManager.Store = pgxstore.New(db)

	sessionManager.Lifetime = 7 * 24 * time.Hour
	sessionManager.Cookie.Name = "session_id"
	sessionManager.Cookie.HttpOnly = true
	sessionManager.Cookie.Persist = true

	e.Use(session.LoadAndSave(sessionManager))

	return sessionManager
}
