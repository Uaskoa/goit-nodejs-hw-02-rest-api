const service = require('../../service');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await service.user.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong',
      });
    }

    if (!user.verify) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Email is not verified',
      });
    }

    const { SECRET_KEY } = process.env;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY);
    await service.user.updateById(user._id, { token });

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        token: token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
