const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const getUser = require('./getUser');
const updateAvatar = require('./updateAvatar');
const updateSubscription = require('./updateSubscription');
const verify = require('./verify');
const repeatVerify = require('./repeatVerify')

module.exports = {
  signup,
  login,
  logout,
  getUser,
  updateAvatar,
  updateSubscription,
  verify,
  repeatVerify,
};
