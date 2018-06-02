
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pendingplayers').del()
    .then(function () {
      // Inserts seed entries
      return knex('pendingplayers').insert([
        {user_name: 'user1'},
        {user_name: 'user2'}
      ]);
    });
};
