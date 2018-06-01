const settings = require('./settings.json');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

knex('pokemon').insert({name: 'Pikachu', pokedex_num: 25, health: 100, attack: 20, rarity: "common", imageURL: 'http://'});
