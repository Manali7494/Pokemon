
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Usr1', email: '11@gmail.com', password: '001', gold: 0, pokeballs: 20},
        {username: 'Usr2', email: '12@gmail.com', password: '002', gold: 0, pokeballs: 20 },
        {username: 'Usr3', email: '13@gmail.com', password: '003', gold: 0, pokeballs: 20}
      ]);
    });
};
