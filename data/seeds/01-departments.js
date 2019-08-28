
exports.seed = function(knex) {
      return knex('departments').insert([
        {id: 1, name: 'Lazy People Department' , description: "We are all lazy people hanging around"},
        {id: 2, name: 'I did not do it department' , description: "We never break anything"},
        {id: 3, name: 'Garbage is not my problem' , description: "We never do something others can do"}
      ]);
};
