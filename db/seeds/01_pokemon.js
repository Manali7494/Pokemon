
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pokemon').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon').insert([
        {name: 'Pokemon1', pokedex_num: 1, health: 100, attack: 20 , type: 'water', rarity: 'common', imgurl: 'http://'},
        {name: 'Pokemon2', pokedex_num: 2, health: 100, attack: 40, type: 'fire', rarity: 'uncommon', imgurl: 'http://'},
        {name: 'Pokemon3', pokedex_num: 3, health: 200, attack: 50, type: 'ice', rarity: 'rare', imgurl: 'http://'}
      ]);
    });
};
