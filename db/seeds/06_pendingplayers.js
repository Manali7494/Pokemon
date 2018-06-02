
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pendingplayers').del()
    .then(function () {
      // Inserts seed entries
      return knex('pendingplayers').insert([
        {user_name: 'user1', pending_started: knex.fn.now()},
        {user_name: 'user2', pending_started: knex.fn.now()}
      ]);
    });
};
