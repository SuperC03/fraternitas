-- name: GetUserByKerb :one
SELECT * FROM "user"
WHERE kerb=$1 LIMIT 1;

-- name: GetUserAndFratByKerb :one
SELECT * FROM "user"
LEFT JOIN "organization" on "user".org_id = "organization".id
WHERE kerb=$1 LIMIT 1;