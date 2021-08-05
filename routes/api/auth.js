const express = require('express');
const { userValidateMiddleware } = require('../../service/schemas/user');
const { auth: ctrl } = require('../../model');

const router = express.Router();
const { validateToken, uploadAvatar } = require('../../middlewares');

router.post('/signup', express.json(), userValidateMiddleware, ctrl.signup);
router.post('/login', express.json(), userValidateMiddleware, ctrl.login);
router.get('/current', validateToken, ctrl.getUser);
router.post('/logout', validateToken, ctrl.logout);
router.patch('/avatars', validateToken, uploadAvatar.single('avatar'), ctrl.updateAvatar);

module.exports = router;
