const settings = require('./settings.json');
var set = {
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
};
const knex = require('knex')(set);
console.log(set);

knex.schema.dropTableIfExists('pokemon');
knex.schema.dropTableIfExists('users');
knex.schema.dropTableIfExists('wildgame');
knex.schema.dropTableIfExists('multigame');
knex.schema.dropTableIfExists('pokedex');
console.log('test1');
knex.schema.createTable('pokemon', function(table){
  table.increments();
  table.string('name');
  table.integer('pokedex_num');
  table.integer('health');
  table.integer('attack');
  table.string('rarity');
  table.string('imageURL');
});

console.log('test2');
knex.schema.createTable('users', function(table){
  table.increments();
  table.string('username');
  table.string('email');
  table.string('password');
  table.string('pokedex.id');
});


knex.schema.createTable('wildgame', function(table){
  table.increments();
  table.integer('user.id');
  table.integer('wild_health');
  table.string('won');
  table.integer('pokemon.id');
});


knex.schema.createTable('multigame', function(table){
  table.increments();
  table.string('user1.id');
  table.string('user2.id');
  table.string('winner');
  table.string('attacker');
});

knex.schema.createTable('pokedex', function(table){
  table.increments();
  table.string('status');
  table.integer('pokemon.id');
  table.integer('pokemon_health');
  table.string('nickname');
  table.integer('user.id');
});
