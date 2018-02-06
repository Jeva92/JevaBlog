import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

function cipherEmail(email_) {
  const cipherEmail = crypto.createCipher('aes192', process.env.CRYPTO_EMAIL_SECRET);
  var email = cipherEmail.update(email_, 'utf8', 'hex');
  email += cipherEmail.final('hex');
  return email;
}

function cipherPassword(password_) {
  const cipherPassword = crypto.createCipher('aes192', process.env.CRYPTO_PASSWORD_SECRET);
  var password = cipherPassword.update(password_, 'utf8', 'hex');
  password += cipherPassword.final('hex');
  return password;
}
