const service = require('../service/');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await service.user.getOne({ email });
    if (result) {
      return await res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      });
    }
    const newUser = await service.user.add({ email, password });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: { email: newUser.email, subscription: newUser.subscription },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.user.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      return await res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong',
      });
    }

    const { SECRET_KEY } = process.env;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY);
    //  await service.user.updateById(user._id, token);

    await res.status(200).json({
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

const logout = async (req, res, next) => {
  try {
    await service.user.updateById(req.user._id, { token: null });
    res.status(204).json({
      status: 'success',
      code: 204,
      message: 'No Content',
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = {
  signup,
  login,
  logout,
  getUser,
};
