-- name: GetUserByKerb :one
SELECT * FROM "user"
WHERE kerb=$1 LIMIT 1;

-- name: CreateNonAdminUser :one
INSERT INTO "user" (
    "name", kerb, phone, department, class_year
) VALUES (
    $1, $2, $3, $4, $5
)
RETURNING kerb, is_admin, org_id, "name";

-- name: GetEventsOverview :many
SELECT "event".id, org_id, title, "start", category, "organization".code AS "org_code" FROM "event"
LEFT JOIN "organization" ON "event".org_id = "organization".id
WHERE (
    (org_id = @org_id OR @org_id = 0) AND
    (category = @category::text OR @category = '') AND
    (DATE(start) >= DATE(@after::text) OR @after IS NULL)
)
ORDER BY "start" ASC;

-- name: GetOrgsOverview :many
SELECT id, "name" FROM "organization"
ORDER BY code ASC;

-- name: GetDatesOverview :many
SELECT DATE("start") FROM "event"
GROUP BY DATE("start") ORDER BY DATE("start");

-- name: GetDatetimesOverview :many
SELECT "start" FROM "event"
GROUP BY "start";

-- name: GetEventInformation :one
SELECT "event".id, org_id, title, "start", "end", "description", "location", category, "organization"."name" as org_name FROM "event"
LEFT JOIN "organization" ON "event".org_id = "organization".id
WHERE "event".id = $1
LIMIT 1;