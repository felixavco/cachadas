const nodeMailer = require('nodemailer');
const { SMTP_USER, SMTP_PWD, SMTP_SERVER } = require('../config/keys');

const trasnporter = nodeMailer.createTransport({
  host: SMTP_SERVER,
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PWD
  }
})

const messageContactForm = (data) => {
  const template = `
    <h3>Message from ${ data.name }</h3>
    <p>${ data.message }</p>
  `;

  const email = {
    to: 'felizavco@gmail.com', 
    from: data.email, 
    subject: `[Contact Form] ${ data.subject }`, 
    html: template
  }

  return trasnporter.sendMail(email);
}

module.exports = messageContactForm;

