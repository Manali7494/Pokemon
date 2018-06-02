
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('wildgame').del()
    .then(function () {
      // Inserts seed entries
      return knex('wildgame').insert([
        {username: 'Usr1', wild_health: 100, wild_id: 1, wild_win: true},
        {username: 'Usr2', wild_health: 100, wild_id: 2, wild_win: false},
        {username: 'Usr3', wild_health: 100, wild_id: 3, wild_win: false}
      ]);
    });
};
