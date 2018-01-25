import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jwt-simple';

const knex = require('../utils/knex').connect();

dotenv.config();

function _generateToken(id) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: id, iat: timestamp }, process.env.JWT_SECRET);
}

function _cipherEmail(email_) {
  const cipherEmail = crypto.createCipher('aes192', process.env.CRYPTO_EMAIL_SECRET);
  var email = cipherEmail.update(email_, 'utf8', 'hex');
  email += cipherEmail.final('hex');
  return email;
}

function _cipherPassword(password_) {
  const cipherPassword = crypto.createCipher('aes192', process.env.CRYPTO_PASSWORD_SECRET);
  var password = cipherPassword.update(password_, 'utf8', 'hex');
  password += cipherPassword.final('hex');
  return password;
}

export async function login(req, res) {
  if (!req.body.email) {
    return res.status(422).send('Email must be provided')
  }
  if (!req.body.password) {
    return res.status(422).send('Password must be provided')
  }
  var email = _cipherEmail(req.body.email);
  var password = _cipherPassword(req.body.password);
  try {
    var value = await knex('users').where('email', email)
    const [id] = value;
    if (!id) {
      return res.status(401).send('Email not found');
    } else {
      if (id.password != password) {
        return res.status(401).send('Wrong password');
      } else {
        return res.status(200).json({username: id.username, accountType: id.accountType, token: _generateToken(id.id) })
      }
    }
  } catch(err) {
    console.log(err);
    return res.status(500).send('Something broke in the backend')
  }
}

export async function register(req, res) {
  if (!req.body.username) {
    return res.status(422).send('Username must be provided')
  }
  if (!req.body.email) {
    return res.status(422).send('Email must be provided')
  }
  if (!req.body.password) {
    return res.status(422).send('Password must be provided')
  }
  var username = req.body.username;
  var email = _cipherEmail(req.body.email);
  var password = _cipherPassword(req.body.password);
  try {
    var value = await knex('users').where('email', email)
    const [id] = value;
    if (id) {
      return res.status(422).send('Email already exists')
    } else if (id.username == username) {
      return res.status(422).send('Username already exists')
    } else {
      await knex('users').insert({ 'username': username, 'password': password, 'email': email })
      return res.status(200).send('User created, activation through email is required')
    }
  } catch(err) {
    console.log(err)
    return res.status(500).send('Something broke in the backend')
  }
}
