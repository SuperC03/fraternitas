package config

import (
	"os"
	"time"

	"github.com/rs/zerolog"
)

func LogInit(env *EnvConfig) (*zerolog.Logger, error) {
	var logger zerolog.Logger
	// Output to file or Stdout (default)
	if env.LogOutput != "" {
		file, err := os.Open(env.LogOutput)
		if err != nil {
			return nil, err
		}
		logger = zerolog.New(file)
	} else {
		// Output JSON or pretty (default)
		if env.LogPretty {
			output := zerolog.ConsoleWriter{Out: os.Stdout, TimeFormat: time.RFC3339}
			logger = zerolog.New(output)
		} else {
			logger = zerolog.New(os.Stdout)
		}
	}
	// Set log level
	logger = logger.Level(zerolog.Level(env.LogLevel))
	// Add timestamp
	logger = logger.With().Timestamp().Logger()
	return &logger, nil
}
