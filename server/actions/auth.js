import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
const knex = require('../utils/knex').connect();
import { cipherEmail, cipherPassword } from '../utils/crypto';
import { generateToken } from '../utils/jwt';
import { sendActivationEmail } from '../utils/mail';

dotenv.config();

export async function login(req, res) {
  if (!req.body.email) {
    return res.status(422).send('Email must be provided')
  }
  if (!req.body.password) {
    return res.status(422).send('Password must be provided')
  }
  try {
  var email = cipherEmail(req.body.email);
  var password = cipherPassword(req.body.password);
    var value = await knex('users').where('email', email);
    const [id] = value;
    if (!id) {
      return res.status(401).send('Email not found');
    } else {
      if (id.password != password) {
        return res.status(401).send('Wrong password');
      } else {
        var loginSuccess = await {username: id.username, accountType: id.accountType, jwttoken: generateToken(id.id, id.accountType) };
        return res.status(200).json(loginSuccess);
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
  try {
  var username = req.body.username;
  var email = cipherEmail(req.body.email);
  var password = cipherPassword(req.body.password);
    var value = await knex('users').where('email', email)
    const [id] = value;
    if (id) {
      return res.status(422).send('Email already exists')
    } else if (id.username == username) {
      return res.status(422).send('Username already exists')
    } else {
      var [id] = await knex('users').insert({ 'username': username, 'password': password, 'email': email }).returning('id')
      var [value] = await knex('users').where('id', id);
      await sendActivationEmail(req.body.email, _generateToken(id, value.accountType))
      return res.status(200).send('User created, activation through email is required')
    }
  } catch(err) {
    console.log(err)
    return res.status(500).send('Something broke in the backend')
  }
}
