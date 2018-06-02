exports.up = function(knex) {
  return knex.schema.createTable("wildgame", (table) => {
    table.increments();
    table.string('username');
    table.integer('wild_health');
    table.integer('wild_id');
    table.boolean('wild_win');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('wildgame');
};
