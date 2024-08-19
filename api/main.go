package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/superc03/fraternitas/api/config"
	"github.com/superc03/fraternitas/api/routes"
)

func main() {
	// Custom context for graceful shutdown
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	// Environmental variable shenanigans
	env, err := config.EnvParse()
	if err != nil {
		log.Fatal("Error parsing environmental variables\n", err.Error())
	}

	// Logger shenanigans
	logger, err := config.LogInit(&env)
	if err != nil {
		log.Fatal("Unable to initialize logger\n", err.Error())
	}
	// Postgres shenanigans
	db, err := config.DbInit(ctx, &env)
	if err != nil {
		log.Fatal("Unable to connect to Postgres\n", err.Error())
	}

	defer db.Close()
	// Redis shenanigans
	redis, err := config.RedisInit(ctx, &env)
	if err != nil {
		log.Fatal("Unable to connect to Redis\n", err.Error())
	}
	// Echo server shenanigans
	server, e, sessionManager := config.EchoInit(&env, logger, db, redis)
	r := routes.NewRouteFactory(&env, logger, db, redis, sessionManager)
	r.RegisterRoutes(e)
	go func() {
		if err = server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Unable to start Echo server\n", err.Error())
		}
	}()

	// Good to go...
	logger.Info().Str("host", env.ServerHost).Str("port", env.ServerPort).Msg("Server started 🎉")
	// Wait for interrupt to stop server
	<-ctx.Done()
	logger.Info().Msg("Shutting down server in <10 seconds")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		log.Fatal("Failed to stop Echo server properly\n", err.Error())
	}
	logger.Info().Msg("Server stopped 👋")
}
