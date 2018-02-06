import dotenv from 'dotenv';

dotenv.config();

function sendActivationEmail(email, token) {
  var transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
  });
  transporter.sendMail({
    from: 'admin@jevablog.daa',
    to: email,
    subject: 'Activation email to your jevablog account',
    text: process.env.URL_TO_SITE + '/activate?token=' + token
  })
}
