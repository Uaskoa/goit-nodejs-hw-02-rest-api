const service = require('../../service');
const { nanoid } = require('nanoid');
require('dotenv').config();
const { sendMail } = require('../../utils');

const repeatVerify = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await service.user.getOne({ email });

    if (!email) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required field email',
      });
    }

    if (user.verify) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Verification has already been passed',
      });
    }
    const id = user._id;
    const verificationToken = nanoid();
    await service.user.updateById(id, { verifyToken: verificationToken });

    const mail = {
      to: email,
      subject: 'Verify your e-mail',
      text: `<a href=http://localhost:3000/api/v1/users/verify/${verificationToken}>Press to verify your e-mail</a>`,
    };
    await sendMail(mail);
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Verification email sent',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = repeatVerify;
