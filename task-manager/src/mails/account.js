const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: 'Thanks for joining us!',
    text: `Welcome to the app, ${name}. Please feel free to provide your feedback.`
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: 'Sad to see you go!',
    text: `We're sad to see you go but your account has been cancelled. Feel free to send us any feedback on your experience.`
  });
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
