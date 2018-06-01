exports.up = function(knex) {
  return knex.schema.createTable("pendingplayers", (table) => {
    table.increments();
    table.integer('user_id').unsigned();
    table.timestamp('pending_started');
    table.foreign('user_id').references('users.id');
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pendingplayers');
};
