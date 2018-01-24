exports.up = async function(knex) {
  return knex.schema.createTable('test', function(table) {
    table.increments('id').primary().index();
  });
};

exports.down = async function(knex) {
  return knex.schema.dropTable('test');
};
