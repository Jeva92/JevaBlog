import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config()

export async function login(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  //crypto hash the email and password
  //compare crypted email and password with db
  //generate token for user
  //return token or 401 unauthorized
}
