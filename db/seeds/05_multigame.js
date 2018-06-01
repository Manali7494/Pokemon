
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('multigame').del()
    .then(function () {
      // Inserts seed entries
      return knex('multigame').insert([
        {user1_id: 1, user2_id: 2, multi_winner: 1, multi_attacker: 2},
        {user1_id: 2, user2_id: 3, multi_winner: 2, multi_attacker: 3}
      ]);
    });
};
