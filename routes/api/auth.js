const express = require('express');
const passport = require('passport');
const { auth: ctrl } = require('../../model');

const router = express.Router();
const { validateToken } = require('../../middlewares');

router.post('/signup', express.json(), ctrl.signup);
router.post('/login', express.json(), ctrl.login);
router.get('/current', validateToken, ctrl.getUser);
router.get('/logout', validateToken, ctrl.logout);

module.exports = router;
