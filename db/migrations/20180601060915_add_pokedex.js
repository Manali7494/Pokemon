exports.up = function(knex) {
  return knex.schema.createTable("pokedex", (table) => {
    table.increments();
    table.string('status');
    table.integer('pokemon_id').unsigned();
    table.integer('pokemon_health');
    table.string('nickname');
    table.integer('user_id').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("pokedex");
};
