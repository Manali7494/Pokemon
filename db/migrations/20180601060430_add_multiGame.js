exports.up = function(knex) {
  return knex.schema.createTable("multigame", (table) => {
    table.increments();
    table.integer('user1_id').unsigned();
    table.integer('user2_id').unsigned();
    table.integer('multi_winner').unsigned();
    table.integer('multi_attacker').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("multigame");
};
