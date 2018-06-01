
exports.up = function(knex) {
  return knex.schema.createTable("pokemon", (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('pokedex_num').notNullable();
    table.integer('health').notNullable();
    table.integer('attack').notNullable();
    table.string('type').notNullable();
    table.string('rarity').notNullable();
    table.string('imgurl').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("pokemon");
};
