package models

import "time"

type Event struct {
	ID          int       `db:"id"`
	OrgId       int       `db:"org_id"` // OrgId points to an Organization
	Title       int       `db:"title"`
	Start       time.Time `db:"start"`
	End         time.Time `db:"end"`
	Description string    `db:"description"`
	Venue       string    `db:"venue"`
	Location    string    `db:"location"`
}

type CheckIn struct {
	ID        int       `db:"id"`
	EventId   int       `db:"event_id"`   // EventId points to an Event
	MemberId  int       `db:"member_id"`  // MemberId points to a User (the one taking down codes)
	PnmId     int       `db:"pnm_id"`     // PnmId points to a User (the one giving their code)
	createdAt time.Time `db:"created_at"` // Important, as it acts as a timestamp for the checkin
}

type Reservation struct {
	ID      int `db:"id"`
	UserId  int `db:"user_id"`  // UserId points to a User (the one making the reservation)
	EventId int `db:"event_id"` // EventId points to an Event (the one being registered for)
}
