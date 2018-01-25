import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jwt-simple';

const knex = require('../utils/knex').connect();

dotenv.config();

function _generateToken(id) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: id, iat: timestamp }, process.env.JWT_SECRET);
}

export async function login(req, res) {
  if (!req.body.email) {
    res.status(401).send('Email must be provided')
  }
  if (!req.body.password) {
    res.status(401).send('Password must be provided')
  }
  var email = req.body.email;
  var password = req.body.password;
  const cipherEmail = crypto.createCipher('aes192', process.env.CRYPTO_EMAIL_SECRET);
  email = cipherEmail.update(email, 'utf8', 'hex');
  email += cipherEmail.final('hex');
  const cipherPassword = crypto.createCipher('aes192', process.env.CRYPTO_PASSWORD_SECRET);
  password = cipherPassword.update(password, 'utf8', 'hex');
  password += cipherPassword.final('hex');
  try {
    var foundEmail = await knex('users').where('email', email)
    const [id] = foundEmail;
    if (!id) {
      res.status(401).send('Email not found');
    } else {
      if (id.password != password) {
        res.status(401).send('Wrong password');
      } else {
        res.status(200).json({username: id.username, accountType: id.accountType, token: _generateToken(id.id) })
      }
    }
  } catch(err) {
    console.log(err);
  }
}
