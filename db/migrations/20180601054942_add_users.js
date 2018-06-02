exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.integer('pokedex_num').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
