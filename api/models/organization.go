package models

type Organization struct {
	ID           int    `db:"id"`
	Name         string `db:"name"`
	Code         string `db:"code"`          // Shortname (eg. BTP)
	ContactName  string `db:"contact_name"`  // Rush Contact Name
	ContactEmail string `db:"contact_email"` // Rush Contact Email
	Url          string `db:"url"`           // Org Site
	IfcUrl       string `db:"ifc_url"`       // IFC Org Site
	Address      string `db:"address"`
}
