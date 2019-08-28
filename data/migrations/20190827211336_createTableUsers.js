exports.up = function(knex) {
    return knex.schema.createTable('departments' , tbl => {
        tbl.increments('id');
        tbl.string('name' , 255).notNullable().unique();
        tbl.string('description' , 255).notNullable();
    })
  
       .createTable('users', tbl=> {
        tbl.increments('id');
        tbl.string('username', 255).notNullable().unique();
        tbl.string('password', 255).notNullable();
        tbl.integer('department_id').notNullable()
          .references('id').inTable('departments')
          .onUpdate('NO ACTION')
          .onDelete('NO ACTION');
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('users')
                        .dropTableIfExists('departments');
  };