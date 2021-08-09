const service = require('../../service');

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

module.exports = getContactById;
