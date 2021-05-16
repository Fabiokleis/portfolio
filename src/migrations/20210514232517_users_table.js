
exports.up = (knex) => knex.schema.createTable('users', (table) => {

    table.increments('id').primary();
    table.text('name').unique().notNullable();
    table.text('email').unique().notNullable();
    table.text('password').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
});

exports.down = (knex) => {
  knex.schema.dropTable('users');
};
