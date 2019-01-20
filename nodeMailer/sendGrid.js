const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const { SENDGRID_KEY } = require('../config/keys');

const transporter = nodemailer.createTransport(
	sendGridTransport({
		auth: { 
      api_key: SENDGRID_KEY
    }
	})
);

const resetPasswordEmail = (userEmail, token) => {
	let template = `
    <h3>Reset your password for Cachadas.com</h3>
    <p>to reset your password please click <a href="http://localhost:3000/reset-password/${token}">HERE</a></p>
    <hr/>
    <p>If you have not requested this password reset, please ignore and discard this message</p>

  `;

  const email = {
    to: userEmail,
		from: 'no-reply@xilews.com',
		subject: `Cachadas.com - Reset password request for ${userEmail}`,
		html: template
  }


	transporter.sendMail(email);

};

module.exports = resetPasswordEmail;
