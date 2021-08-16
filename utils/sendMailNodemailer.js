require('dotenv').config();
const nodemailer = require('nodemailer');
const { EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'uaskoa@meta.ua',
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);
const sendMailNodemailer = async ({ to, subject, text, html }) => {
  const mail = {
    to,
    from: 'uaskoa@meta.ua',
    subject,
    text,
    html,
  };

  const answer = await transporter.sendMail(mail);
  return answer;
};

module.exports = sendMailNodemailer;
