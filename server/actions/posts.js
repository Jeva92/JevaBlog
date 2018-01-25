const knex = require('../utils/knex').connect();

export async function posts(req,res) {
  try {
    var data = await knex('test').select('*')
    return res.json(data);
  } catch (err) {
    return res.json(err)
  }
}
