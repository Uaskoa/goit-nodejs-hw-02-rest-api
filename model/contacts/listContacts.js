const service = require('../../service');

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

module.exports = listContacts;
