// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: query.sql

package data

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const getUserAndFratByKerb = `-- name: GetUserAndFratByKerb :one
SELECT "user".id, created_at, updated_at, kerb, email, phone, department, class_year, gender, residence, legacy, org_id, is_admin, bid_status, organization.id, name, code, contact_name, contact_email, url, ifc_url, address FROM "user"
LEFT JOIN "organization" on "user".org_id = "organization".id
WHERE kerb=$1 LIMIT 1
`

type GetUserAndFratByKerbRow struct {
	ID           int32
	CreatedAt    pgtype.Timestamptz
	UpdatedAt    pgtype.Timestamptz
	Kerb         string
	Email        pgtype.Text
	Phone        pgtype.Text
	Department   pgtype.Text
	ClassYear    pgtype.Text
	Gender       pgtype.Text
	Residence    pgtype.Text
	Legacy       pgtype.Text
	OrgID        pgtype.Int4
	IsAdmin      bool
	BidStatus    pgtype.Text
	ID_2         pgtype.Int4
	Name         pgtype.Text
	Code         pgtype.Text
	ContactName  pgtype.Text
	ContactEmail pgtype.Text
	Url          pgtype.Text
	IfcUrl       pgtype.Text
	Address      pgtype.Text
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
SELECT id, created_at, updated_at, kerb, email, phone, department, class_year, gender, residence, legacy, org_id, is_admin, bid_status FROM "user"
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
	)
	return i, err
}
