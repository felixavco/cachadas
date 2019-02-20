const nodeMailer = require('nodemailer');
const { SMTP_USER, SMTP_PWD, SMTP_SERVER } = require('../config/keys');

const transporter = nodeMailer.createTransport({
  host: SMTP_SERVER,
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PWD
  }
})

exports.messageContactForm = (data) => {
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

  return transporter.sendMail(email);
}

exports.reportProblem = (data) => {
  const template = `
    <h3>Category: ${ data.category }</h3>
    <p>${ data.message }</p>
  `;

  const email = {
    to: 'felizavco@gmail.com', 
    from: 'reports@no-reply.xilews.com', 
    subject: `[Problem Report] ${ data.subject }`, 
    html: template
  }

  return transporter.sendMail(email);
}




