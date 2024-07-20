package config

import "github.com/caarlos0/env/v11"

type EnvConfig struct {
	// Logger
	LogPretty bool   `env:"LOG_PRETTY" envDefault:"1"`
	LogLevel  int    `env:"LOG_LEVEL" envDefault:"0"`
	LogOutput string `env:"LOG_OUTPUT"`
	// Redis
	RedisPassword string `env:"REDIS_PASSWORD,required"`
	RedisPort     string `env:"REDIS_PORT,required"`
	RedisHost     string `env:"REDIS_HOST,required"`
	RedisDB       int    `env:"REDIS_DB" envDefault:"0"`
	// Postgres
	PostgresUsername string `env:"POSTGRES_USERNAME,required"`
	PostgresPassword string `env:"POSTGRES_PASSWORD,required"`
	PostgresHost     string `env:"POSTGRES_HOST,required"`
	PostgresPort     string `env:"POSTGRES_PORT,required"`
	PostgresName     string `env:"POSTGRES_NAME,required"`
	// HTTP Server
	ServerHost string `env:"SERVER_HOST,required"`
	ServerPort string `env:"SERVER_PORT,required"`
}

func EnvParse() (EnvConfig, error) {
	return env.ParseAs[EnvConfig]()
}
