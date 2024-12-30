# Environmental Variable Descriptions

## Web Variables
- `VITE_API_URI`: Url for API backend
- `VITE_OIDC_ISSUER_URI`: From provided Okta config
- `VITE_OIDC_CLIENT_ID`: From provided Okta config
- `VITE_OIDC_REDIRECT_URI`: Local route for Okta OIDC redirect
- `VITE_APP_VERSION`: App version appearing in footer
- `VITE_APP_TITLE`: App title appearing in header (eg. MIT IFC Spring Rush 2025)

## API Variables
- `LOG_PRETTY`: Boolean (0|1) value if log output should be "pretty printed"
- `LOG_LEVEL`: Integer (-1 - 5) value for [log level](https://github.com/rs/zerolog?tab=readme-ov-file#leveled-logging)
- `LOG_OUTPUT`: String value for log output path (will default to STDOUT if left blank)

- `REDIS_URL`: Connection string for Redis server

- `POSTGRES_USERNAME`: PostgreSQL username
- `POSTGRES_PASSWORD`: PostgreSQL password
- `POSTGRES_HOST`: PostgreSQL server host
- `POSTGRES_PORT`: PostgreSQL server port
- `POSTGRES_NAME`: PostgreSQL database name

- `SERVER_HOST`: API server host
- `SERVER_PORT`: API server port
- `CORS_ALLOW_ORIGIN`: Allowed CORS origin (will likely be the API's public url)

- `MIT_API_PEOPLE_URL`: From provided MIT People API
- `MIT_API_IMAGE_URL`: From provided MIT People API
- `MIT_API_CLIENT_ID`: From provided MIT People API
- `MIT_API_CLIENT_SECRET`: From provided MIT People API

- `OIDC_ISSUER_URI`: From provided Okta config
- `OIDC_REDIRECT_URI`: Web client redirect url
- `OIDC_CLIENT_ID`: From provided Okta config
- `OIDC_CLIENT_SECRET`: From provided Okta config