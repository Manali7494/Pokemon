exports.up = function(knex) {
  return knex.schema.createTable("pokedex", (table) => {
    table.increments();
    table.string('status').defaultTo('inactive');
    table.integer('pokedex_num').unsigned();
    table.integer('pokemon_health');
    table.string('nickname');
    table.string('username').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("pokedex");
};
