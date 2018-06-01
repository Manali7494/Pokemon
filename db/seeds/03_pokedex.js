
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pokedex').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokedex').insert([
        {status: 'active', pokemon_id: 1, pokemon_health: 100, nickname: 'Cutie', user_id: 1},
        {status: 'current', pokemon_id: 2, pokemon_health: 100, nickname: 'Amazing', user_id: 2},
        {status: 'dead', pokemon_id: 3, pokemon_health: 100, nickname: 'Firey', user_id: 3}
      ]);
    });
};
