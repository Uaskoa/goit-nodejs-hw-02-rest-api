const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../model');
const { contactValidateMiddleware } = require('../../service/schemas/contact');

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', contactValidateMiddleware, ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.patch('/:contactId', ctrl.updateContact);

router.patch('/:contactId/favorite', ctrl.updateContactStatus);

module.exports = router;
