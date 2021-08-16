const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../model');
const { validateToken } = require('../../middlewares');
const { contactValidateMiddleware } = require('../../service/schemas/contact');

router.get('/', validateToken, ctrl.listContacts);

router.get('/:contactId', validateToken, ctrl.getContactById);

router.post('/', contactValidateMiddleware, validateToken, ctrl.addContact);

router.delete('/:contactId', validateToken, ctrl.removeContact);

router.patch('/:contactId', validateToken, ctrl.updateContact);

router.patch('/:contactId/favorite', validateToken, ctrl.updateContactStatus);

module.exports = router;
