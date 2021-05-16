/* tables to knex_portifolio */

create table users (
    id serial primary key,
    name text not null unique,
    email text not null unique,
    password text not null
);
