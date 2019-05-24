const nodemailer = require('nodemailer');
const { SMTP_USER, SMTP_PWD, SMTP_SERVER, HOST } = require('../config/keys');

// Settings for Gmail smtp
const transporter = nodeMailer.createTransport({
  host: SMTP_SERVER,
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PWD
  }
})

exports.resetPasswordEmail = (userEmail, token) => {
	let template = `
    <h3>Reset your password for Cachadas.com</h3>
    <p>to reset your password please click <a href="${HOST}/reset-password/${token}">HERE</a></p>
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
  <p>Your account has been created, please complete the verification process, click <a href="${HOST}/account-verification/${data.token}">HERE</a></p> to verify your account</p>
`;

	const email = {
		to: data.email,
		from: 'no-reply@xilews.com',
		subject: `Hello ${data.firstName} Verify your Account!`,
		html: template
	};

	return transporter.sendMail(email);
};
