
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('multigame').del()
    .then(function () {
      // Inserts seed entries
      return knex('multigame').insert([
        {user1_name: 'user1', user2_name: 'user1', multi_winner: 'user1', multi_attacker: 'user1'},
        {user1_name: 'user2', user2_name: 'user3', multi_winner: 'user2', multi_attacker: 'user2'}
      ]);
    });
};
