
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('multigame').del()
    .then(function () {
      // Inserts seed entries
      return knex('multigame').insert([
        {user1_name: 'Usr1', user1_pokedex_num: 7, user1_poke_health: 100, user2_name: 'Usr2', user2_pokedex_num: 1, user2_poke_health: 100, multi_winner: 'Usr1' , multi_attacker: 'Usr1'},
        {user1_name: 'Usr2', user1_pokedex_num: 4, user1_poke_health: 100, user2_name: 'Usr2', user2_pokedex_num: 1, user2_poke_health: 100, multi_winner: 'Usr2' , multi_attacker: 'Usr3'},
      ]);
    });
};
