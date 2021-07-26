const express = require('express');
const { userValidateMiddleware } = require('../../service/schemas/user');
const { auth: ctrl } = require('../../model');

const router = express.Router();
const { validateToken } = require('../../middlewares');

router.post('/signup', express.json(), userValidateMiddleware, ctrl.signup);
router.post('/login', express.json(), userValidateMiddleware, ctrl.login);
router.get('/current', validateToken, ctrl.getUser);
router.post('/logout', validateToken, ctrl.logout);

module.exports = router;
