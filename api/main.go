package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/superc03/fraternitas/api/config"
	"github.com/superc03/fraternitas/api/utils"
)

func main() {
	info, err := utils.MitGetUserImage(context.Background(), "https://mit-people-pictures-v2.cloudhub.io/people/v2/pictures", "f95fdb6a75334e82880e0639b8a12d63", "E579E98462e74982aA4DE195d3Aa43bf", "962029365")
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println(info)
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
	server := config.EchoInit(&env, logger, db, redis)
	go func() {
		if err = server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Unable to start Echo server\n", err.Error())
		}
	}()

	// Good to go...
	logger.Info().Msg("Server started 🎉")
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
