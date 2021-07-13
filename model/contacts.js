// const contacts = require('./contacts.json');
const { Contact } = require('../service/');

const { updateContactsJson, contactScheme } = require('./helpers');

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findById(contactId);
    if (!result) {
      return await res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
    await res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Such id: ${contactId} was not found`,
      });
    }
    await res.status(200).json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }

  await res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  });
};

const addContact = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await Contact.create(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next();
  }
};

// const addContact = async (req, res) => {
//   const { error } = contactScheme.validate(req.body);
//   if (error) {
//     await res.status(400).json({
//       status: 'error',
//       code: 400,
//       message: error.message,
//     });
//   }
//   const newContact = { ...req.body };
//   contacts.push(newContact);

//   await res.status(201).json({
//     status: 'success',
//     code: 201,
//     data: {
//       result: newContact,
//     },
//   });
//   updateContactsJson(contacts);
// };

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  // const { name, email, phone, favorite } = req.body;

  try {
    const result = await Contact.findByIdAndUpdate(contactId, {...req.body}, { new: true },
    );
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing fields',
      });
    }

    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      });
    }
    await res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  console.log(Object.keys(req.body).length === 0);

  try {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true },
    );
    
    if (Object.keys(req.body).length === 0) {
        return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'missing field favorite',
        data: 'Not Found',
      });
    }
  await res.json({
      status: 'success',
      code: 200,
      data: { result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const { name, email, phone } = req.body;
//   const index = contacts.findIndex(
//     contact => contact.id.toString() === contactId,
//   );
//   if (!name && !email && !phone) {
//     return res.status(400).json({
//       status: 'error',
//       code: 400,
//       message: 'missing fields',
//     });
//   }

//   if (index === -1) {
//     return res.status(404).json({
//       status: 'error',
//       code: 404,
//       message: 'Not found',
//     });
//   }

//   contacts[index] = { ...contacts[index], ...req.body };
//   await res.status(201).json({
//     status: 'success',
//     code: 201,
//     data: {
//       result: contacts[index],
//     },
//   });
//   updateContactsJson(contacts);
// };

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
