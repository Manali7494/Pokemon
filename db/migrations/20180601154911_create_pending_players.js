exports.up = function(knex) {
  return knex.schema.createTable("pendingplayers", (table) => {
    table.increments();
    table.string('user_name');
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pendingplayers');
};
