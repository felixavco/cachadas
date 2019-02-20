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

exports.resetPasswordEmail = (userEmail, token) => {
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
	};

	transporter.sendMail(email);
};

exports.sendVerificationToken = (data) => {
	const template = `
  <h3>Hello ${data.firstName} welcome to Cachadas.com</h3>
  <p>Your account has been created, please complete the verification process, click <a href="http://localhost:3000/account-verification/${data.token}">HERE</a></p> to verify your account</p>
`;

	const email = {
		to: data.email,
		from: 'no-reply@xilews.com',
		subject: `Hello ${data.firstName} Verify your Account!`,
		html: template
	};

	return transporter.sendMail(email);
};
