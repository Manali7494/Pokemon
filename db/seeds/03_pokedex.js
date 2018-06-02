
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pokedex').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokedex').insert([
        {status: 'active', pokedex_num: 1, pokemon_health: 100, nickname: 'Cutie', username: 'user1'},
        {status: 'current', pokedex_num: 2, pokemon_health: 100, nickname: 'Amazing', username: 'user2'},
        {status: 'dead', pokedex_num: 3, pokemon_health: 100, nickname: 'Firey', username: 'user3'}
      ]);
    });
};
