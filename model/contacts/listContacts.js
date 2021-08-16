const service = require('../../service');

const listContacts = async (req, res, next) => {
  const userId = req.user.id;
  
  try {
    const result = await service.contact.get(req.query, userId);
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
