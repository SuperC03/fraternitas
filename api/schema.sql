create table organization
(
    id            serial
        constraint organization_pk
            primary key,
    name          varchar not null,
    code          varchar not null,
    contact_name  varchar,
    contact_email varchar,
    url           varchar,
    ifc_url       varchar,
    address       varchar
);

create table "user"
(
    id         serial
        constraint user_pk
            primary key,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null,
    kerb       varchar                 not null,
    email      varchar,
    phone      varchar,
    department varchar,
    class_year varchar,
    gender     varchar,
    residence  varchar,
    legacy     varchar,
    org_id     integer
        constraint user_organization_id_fk
            references organization,
    is_admin   boolean   default false not null,
    bid_status text,
    race       varchar,
    first_gen  boolean,
    name       varchar
);

create table event
(
    id          serial
        constraint event_pk
            primary key,
    org_id      integer not null
        constraint event_organization_id_fk
            references organization,
    title       varchar not null,
    description text,
    start       timestamp,
    venue       varchar,
    location    varchar,
    "end"       timestamp,
    category    varchar
);

create table reservation
(
    id       serial
        constraint reservation_pk
            primary key,
    user_id  integer not null
        constraint reservation_user_id_fk
            references "user",
    event_id integer not null
        constraint reservation_event_id_fk
            references event
);

create table check_in
(
    id         serial
        constraint check_in_pk
            primary key,
    created_at timestamp default now() not null,
    event_id   integer                 not null
        constraint check_in_event_id_fk
            references event,
    member_id  integer                 not null
        constraint check_in_pnm_user_id_fk
            references "user",
    pnm_id     integer                 not null
        constraint check_in_member_user_id_fk
            references "user"
);

create table sessions
(
    token  text                     not null
        primary key,
    data   bytea                    not null,
    expiry timestamp with time zone not null
);

create index sessions_expiry_idx
    on sessions (expiry);

