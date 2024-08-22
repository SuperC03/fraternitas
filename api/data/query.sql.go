// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: query.sql

package data

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const getEventsOverview = `-- name: GetEventsOverview :many
SELECT "event".id, org_id, title, "start", category, "organization".code AS "org_code" FROM "event"
LEFT JOIN "organization" ON "event".org_id = "organization".id
WHERE (
    (org_id = $1 OR $1 = 0) AND
    (category = $2::text OR $2 = '') AND
    (start >= $3::date OR $3 IS NULL)
)
ORDER BY "start" ASC
`

type GetEventsOverviewParams struct {
	OrgID    int32       `json:"org_id"`
	Category string      `json:"category"`
	After    pgtype.Date `json:"after"`
}

type GetEventsOverviewRow struct {
	ID       int32              `json:"id"`
	OrgID    int32              `json:"org_id"`
	Title    string             `json:"title"`
	Start    pgtype.Timestamptz `json:"start"`
	Category pgtype.Text        `json:"category"`
	OrgCode  pgtype.Text        `json:"org_code"`
}

func (q *Queries) GetEventsOverview(ctx context.Context, arg GetEventsOverviewParams) ([]GetEventsOverviewRow, error) {
	rows, err := q.db.Query(ctx, getEventsOverview, arg.OrgID, arg.Category, arg.After)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetEventsOverviewRow
	for rows.Next() {
		var i GetEventsOverviewRow
		if err := rows.Scan(
			&i.ID,
			&i.OrgID,
			&i.Title,
			&i.Start,
			&i.Category,
			&i.OrgCode,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getOrgsOverview = `-- name: GetOrgsOverview :many
SELECT id, "name" FROM "organization"
ORDER BY code ASC
`

type GetOrgsOverviewRow struct {
	ID   int32  `json:"id"`
	Name string `json:"name"`
}

func (q *Queries) GetOrgsOverview(ctx context.Context) ([]GetOrgsOverviewRow, error) {
	rows, err := q.db.Query(ctx, getOrgsOverview)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetOrgsOverviewRow
	for rows.Next() {
		var i GetOrgsOverviewRow
		if err := rows.Scan(&i.ID, &i.Name); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUserAndFratByKerb = `-- name: GetUserAndFratByKerb :one
SELECT "user".id, created_at, updated_at, kerb, email, phone, department, class_year, gender, residence, legacy, org_id, is_admin, bid_status, race, first_gen, organization.id, name, code, contact_name, contact_email, url, ifc_url, address FROM "user"
LEFT JOIN "organization" ON "user".org_id = "organization".id
WHERE kerb=$1 LIMIT 1
`

type GetUserAndFratByKerbRow struct {
	ID           int32              `json:"id"`
	CreatedAt    pgtype.Timestamptz `json:"created_at"`
	UpdatedAt    pgtype.Timestamptz `json:"updated_at"`
	Kerb         string             `json:"kerb"`
	Email        pgtype.Text        `json:"email"`
	Phone        pgtype.Text        `json:"phone"`
	Department   pgtype.Text        `json:"department"`
	ClassYear    pgtype.Text        `json:"class_year"`
	Gender       pgtype.Text        `json:"gender"`
	Residence    pgtype.Text        `json:"residence"`
	Legacy       pgtype.Text        `json:"legacy"`
	OrgID        pgtype.Int4        `json:"org_id"`
	IsAdmin      bool               `json:"is_admin"`
	BidStatus    pgtype.Text        `json:"bid_status"`
	Race         pgtype.Text        `json:"race"`
	FirstGen     pgtype.Bool        `json:"first_gen"`
	ID_2         pgtype.Int4        `json:"id_2"`
	Name         pgtype.Text        `json:"name"`
	Code         pgtype.Text        `json:"code"`
	ContactName  pgtype.Text        `json:"contact_name"`
	ContactEmail pgtype.Text        `json:"contact_email"`
	Url          pgtype.Text        `json:"url"`
	IfcUrl       pgtype.Text        `json:"ifc_url"`
	Address      pgtype.Text        `json:"address"`
}

func (q *Queries) GetUserAndFratByKerb(ctx context.Context, kerb string) (GetUserAndFratByKerbRow, error) {
	row := q.db.QueryRow(ctx, getUserAndFratByKerb, kerb)
	var i GetUserAndFratByKerbRow
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Kerb,
		&i.Email,
		&i.Phone,
		&i.Department,
		&i.ClassYear,
		&i.Gender,
		&i.Residence,
		&i.Legacy,
		&i.OrgID,
		&i.IsAdmin,
		&i.BidStatus,
		&i.Race,
		&i.FirstGen,
		&i.ID_2,
		&i.Name,
		&i.Code,
		&i.ContactName,
		&i.ContactEmail,
		&i.Url,
		&i.IfcUrl,
		&i.Address,
	)
	return i, err
}

const getUserByKerb = `-- name: GetUserByKerb :one
SELECT id, created_at, updated_at, kerb, email, phone, department, class_year, gender, residence, legacy, org_id, is_admin, bid_status, race, first_gen FROM "user"
WHERE kerb=$1 LIMIT 1
`

func (q *Queries) GetUserByKerb(ctx context.Context, kerb string) (User, error) {
	row := q.db.QueryRow(ctx, getUserByKerb, kerb)
	var i User
	err := row.Scan(
		&i.ID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Kerb,
		&i.Email,
		&i.Phone,
		&i.Department,
		&i.ClassYear,
		&i.Gender,
		&i.Residence,
		&i.Legacy,
		&i.OrgID,
		&i.IsAdmin,
		&i.BidStatus,
		&i.Race,
		&i.FirstGen,
	)
	return i, err
}
