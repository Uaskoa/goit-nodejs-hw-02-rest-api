const service = require('../../service');
const { nanoid } = require('nanoid');
require('dotenv').config();
const { sendMail } = require('../../utils');

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await service.user.getOne({ email });
    if (result) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      });
    }
    const verificationToken = nanoid();
    const newUser = await service.user.add({
      email,
      password,
      verifyToken: verificationToken,
    });
    const mail = {
      to: email,
      subject: 'Verify your e-mail',
      text: `<a href=http://localhost:3000/api/v1/users/verify/${verificationToken}>Press to verify your e-mail</a>`,
    };
    await sendMail(mail);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
          verifyToken: newUser.verificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
