
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('multigame').del()
    .then(function () {
      // Inserts seed entries
      return knex('multigame').insert([
        {user1_name: 'Usr1', user2_name: 'Usr2', multi_winner: 'Usr1', multi_attacker: 'user1'},
        {user1_name: 'Usr2', user2_name: 'Usr3', multi_winner: 'Usr2', multi_attacker: 'user2'}
      ]);
    });
};
