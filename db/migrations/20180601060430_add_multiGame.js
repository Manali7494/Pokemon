exports.up = function(knex) {
  return knex.schema.createTable("multigame", (table) => {
    table.increments();
    table.string('user1_name');
    table.string('user2_name');
    table.string('multi_winner');
    table.string('multi_attacker');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("multigame");
};
