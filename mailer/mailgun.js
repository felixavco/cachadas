const { MG_API_KEY, DOMAIN, HOST } = require('../config/keys');
const mailGun = require('mailgun-js')({ apiKey: MG_API_KEY, domain: DOMAIN });

exports.resetPasswordEmail = (userEmail, token) => {
    let template = `
    <h3>Reset your password for Cachadas.com</h3>
    <p>to reset your password please click <a href="${HOST}/reset-password/${token}">HERE</a></p>
    <hr/>
    <p>If you have not requested this password reset, please ignore and discard this message</p>

  `;

    const email = {
        to: userEmail,
        from: 'no-reply-cachadas@' + DOMAIN,
        subject: `Cachadas.com - Reset password request for ${userEmail}`,
        html: template
    };

    mailGun.messages().send(email);
};

exports.sendVerificationToken = (data) => {
    const template = `
  <h3>Hello ${data.firstName} welcome to Cachadas.com</h3>
  <p>Your account has been created, please complete the verification process, click <a href="${HOST}/account-verification/${data.token}">HERE</a></p> to verify your account</p>
`;

    const email = {
        to: data.email,
        from: 'no-reply-cachadas@' + DOMAIN,
        subject: `Hello ${data.firstName} Verify your Account!`,
        html: template
    };

    mailGun.messages().send(email);
};


exports.messageContactForm = (data) => {
    const template = `
      <h3>Message from ${ data.name}</h3>
      <p>${ data.message}</p>
    `;

    const email = {
        to: 'felizavco@gmail.com',
        from: data.email,
        subject: `[Contact Form] ${data.subject}`,
        html: template
    }

    mailGun.messages().send(email);
}

exports.reportProblem = (data) => {
    const template = `
      <h3>Category: ${ data.category}</h3>
      <p>${ data.message}</p>
    `;

    const email = {
        to: 'felizavco@gmail.com',
        from: 'user-report@' + DOMAIN,
        subject: `[Problem Report] ${data.subject}`,
        html: template
    }

    mailGun.messages().send(email);
}


exports.felixavelarContactForm = (data) => {
    const template = `
      <h3>Message from ${ data.name}</h3>
      <p>${ data.message}</p>
    `;

    const email = {
        to: 'hey@felixavelar.com',
        cc: 'felixavco@gmail.com',
        from: data.email,
        subject: `[felixavelar.com] ${data.subject}`,
        html: template
    }

    mailGun.messages().send(email);
}
