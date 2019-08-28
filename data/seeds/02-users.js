
exports.seed = function(knex) {
      return knex('users').insert([
        {id: 1, username: 'ernesto' , password: 'pass1234' , department_id: 1},
        {id: 2, username: 'daniel' , password: 'pass1234' , department_id: 2},
        {id: 3, username: 'sophia' , password: 'pass1234' , department_id: 3}
      ])
};
