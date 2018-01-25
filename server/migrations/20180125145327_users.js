exports.up = async function(knex) {
  try {
    return await knex.schema.createTable('users', function(t) {
      t.increments('id').primary().index();
      t.string('username').notNullable().index();
      t.string('email').notNullable().index();
      t.string('password').notNullable();
      t.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      t.string('accountType').notNullable().defaultTo('user');
      t.boolean('activated').notNullable().defaultTo(false);
    })
  } catch(err) {
    console.log(err);
  }
};

exports.down = async function(knex) {
  try {
    return await knex.schema.dropTable('users');
  } catch(err) {
    console.log(err);
  }
};
