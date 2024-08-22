-- name: GetUserByKerb :one
SELECT * FROM "user"
WHERE kerb=$1 LIMIT 1;

-- name: GetUserAndFratByKerb :one
SELECT * FROM "user"
LEFT JOIN "organization" ON "user".org_id = "organization".id
WHERE kerb=$1 LIMIT 1;


-- name: GetEventsOverview :many
SELECT "event".id, org_id, title, "start", category, "organization".code AS "org_code" FROM "event"
LEFT JOIN "organization" ON "event".org_id = "organization".id
WHERE (
    (org_id = @org_id OR @org_id = 0) AND
    (category = @category::text OR @category = '') AND
    (start >= @after::date OR @after IS NULL)
)
ORDER BY "start" ASC;

-- name: GetOrgsOverview :many
SELECT id, "name" FROM "organization"
ORDER BY code ASC;