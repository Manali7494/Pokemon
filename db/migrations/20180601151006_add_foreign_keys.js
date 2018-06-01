
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table){
    table.foreign('pokedex_id').references('pokemon.id');
  })
    .alterTable('multigame', function(table){
      table.foreign('user1_id').references('users.id');
      table.foreign('user2_id').references('users.id');
      table.foreign('multi_winner').references('users.id');
      table.foreign('multi_attacker').references('users.id');
    })
    .alterTable('pokedex', function(table){
      table.foreign('pokemon_id').references('pokemon.id');
      table.foreign('user_id').references('users.id');
    })
    .alterTable('wildgame', function(table){
      table.foreign('user_id').references('users.id');
      table.foreign('wild_id').references('pokemon.id');
    });
};
exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', function(table){
    table.dropForeign('pokedex_id');
  })
    .alterTable('multigame', function(table){
      table.dropForeign('user1_id');
      table.dropForeign('user2_id');
      table.dropForeign('multi_winner');
      table.dropForeign('multi_attacker');
    })
    .alterTable('pokedex', function(table){
      table.dropForeign('pokemon_id');
      table.dropForeign('user_id');
    })
    .alterTable('wildgame', function(table){
      table.dropForeign('user_id');
      table.dropForeign('wild_id');
    });
};
