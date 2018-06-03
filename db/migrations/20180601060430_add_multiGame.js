exports.up = function(knex) {
  return knex.schema.createTable("multigame", (table) => {
    table.increments();
    table.string('user1_name');
    table.integer('user1_pokedex_num');
    table.integer('user1_poke_health');
    table.string('user2_name');
    table.integer('user2_pokedex_num');
    table.integer('user2_poke_health');
    table.string('multi_winner');
    table.string('multi_attacker');
  });
};
  
exports.down = function(knex, Promise) {
  return knex.schema.dropTable("multigame");
};
