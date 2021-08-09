require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async ({ to, subject, text, html }) => {
  const mail = {
    to,
    from: 'uaskoa@meta.ua',
    subject,
    text,
    html,
  };

  const answer = await sgMail.send(mail);
  return answer;
};

module.exports = sendMail;
