package models

import "time"

type User struct {
	ID         int       `db:"id"`
	OrgId      int       `db:"org_id"` // OrgId points to an Organization
	IsAdmin    bool      `db:"is_admin"`
	Kerb       string    `db:"kerb"`
	Email      string    `db:"email"`
	Phone      string    `db:"phone"`
	Department string    `db:"department"`
	ClassYear  string    `db:"class_year"`
	Gender     string    `db:"gender"`
	Residence  string    `db:"residence"`
	Legacy     string    `db:"legacy"`
	BidStatus  string    `db:"bid_status"`
	CreatedAt  time.Time `db:"created_at"`
	UpdatedAt  time.Time `db:"updated_at"`
}
