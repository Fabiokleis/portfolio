/* tables to knex_portifolio */

create table users (
    id serial primary key,
    name text not null unique,
    email text not null unique,
    password text not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp,
    token_date timestamp unique,
    reset_token text unique
);

create table subscribedemails(
    email text not null unique
);

create table posts(
    id serial,
    user_id integer not null references users(id) on delete cascade,
    title text not null unique,
    description text not null
);
