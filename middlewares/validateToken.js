const passport = require('passport');

const validateToken = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user || !user.token) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = validateToken;
