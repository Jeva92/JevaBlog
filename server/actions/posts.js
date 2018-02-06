const knex = require('../utils/knex').connect();

export async function posts(req,res) {
  try {
    var data = await knex('test').select('*')
    return res.status(200).json(data);
  } catch (err) {
    return res.status(200).json(err)
  }
}
