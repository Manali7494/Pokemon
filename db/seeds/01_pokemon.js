
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pokemon').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon').insert([
        {name: 'Squirtle', pokedex_num: 7, health: 100, attack: 20 , type: 'water', rarity: 'common', imgurl: ''},
        {name: 'Charmander', pokedex_num: 4, health: 100, attack: 20, type: 'fire', rarity: 'common', imgurl: ''},
        {name: 'Bulbasaur', pokedex_num: 1, health: 100, attack: 20, type: 'grass', rarity: 'common', imgurl: ''}
      ]);
    });
};
