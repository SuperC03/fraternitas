package config

import (
	"context"
	"fmt"
	"github.com/redis/go-redis/v9"
)

func RedisInit(ctx context.Context, env *EnvConfig) (*redis.Client, error) {
	opt, err := redis.ParseURL(env.RedisUrl)
	if err != nil {
		return nil, fmt.Errorf("unable to parse Redis connection string: %w", err)
	}
	client := redis.NewClient(opt)
	if err := client.Ping(ctx).Err(); err != nil {
		return nil, err
	}
	return client, nil
}
