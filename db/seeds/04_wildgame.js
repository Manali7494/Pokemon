
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('wildgame').del()
    .then(function () {
      // Inserts seed entries
      return knex('wildgame').insert([
        {username: 'user1', wild_health: 100, wild_id: 1, wild_win: true},
        {username: 'user2', wild_health: 100, wild_id: 2, wild_win: false},
        {username: 'user3', wild_health: 100, wild_id: 3, wild_win: false}
      ]);
    });
};
