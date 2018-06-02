exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string('username');
    table.string('email');
    table.string('password');
    table.integer('gold');
    table.integer('pokeballs');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
