package config

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

func DbInit(ctx context.Context, env *EnvConfig) (*pgxpool.Pool, error) {
	connString := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s",
		env.PostgresUsername,
		env.PostgresPassword,
		env.PostgresHost,
		env.PostgresPort,
		env.PostgresName,
	)
	return pgxpool.New(ctx, connString)
}
