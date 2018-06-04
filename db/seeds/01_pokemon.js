
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pokemon').del()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon').insert([
        {name: 'Squirtle', pokedex_num: 7, health: 100, attack: 20 , type: 'water', rarity: 'common', imgurl: 'http://static.pokemonpets.com/images/monsters-images-300-300/7-Squirtle.png'},
        {name: 'Charmander', pokedex_num: 4, health: 100, attack: 20, type: 'fire', rarity: 'common', imgurl: 'https://vignette.wikia.nocookie.net/pokemon-revolution/images/4/41/004Charmander_OS_anime_2.png/revision/latest?cb=20150625082016'},
        {name: 'Bulbasaur', pokedex_num: 1, health: 100, attack: 20, type: 'grass', rarity: 'common', imgurl: 'https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/1200px-001Bulbasaur.png'}
      ]);
    });
};