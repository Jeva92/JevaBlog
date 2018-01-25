var crypto = require('crypto');
var dotenv = require('dotenv');

exports.up = async function(knex) {
  dotenv.config();
  var email = 'admin@admin.admin';
  var password = 'admin';
  const cipherEmail = crypto.createCipher('aes192', process.env.CRYPTO_EMAIL_SECRET);
  email = cipherEmail.update(email, 'utf8', 'hex');
  email += cipherEmail.final('hex');
  const cipherPassword = crypto.createCipher('aes192', process.env.CRYPTO_PASSWORD_SECRET);
  password = cipherPassword.update(password, 'utf8', 'hex');
  password += cipherPassword.final('hex');
  try {
    return await knex('users').insert({'username': 'admin', 'email': email, 'password': password, 'activated': true, 'accountType': 'admin'})
  } catch(err) {
    console.log(err);
  }
};

exports.down = async function(knex) {
  try {
    return await knex('users').where('username', 'username').del();
  } catch(err) {
    console.log(err);
  }
};
