const service = require('../service/');

const listContacts = async (req, res, next) => {
  try {
    const result = await service.contact.get(req.query);
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

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.contact.getById(contactId);
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

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.contact.remove(contactId);
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
};

const addContact = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await service.contact.add(body);
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

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.contact.update(contactId, { ...req.body });
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

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;

  const { favorite = false } = req.body;

  try {
    const result = await service.contact.updateStatus(contactId, { favorite });

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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
