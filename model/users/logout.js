const service = require('../../service');
require('dotenv').config();


const logout = async (req, res, next) => {
  const id = req.user._id;
  try {
    await service.user.updateById(id, { token: null });
    res.status(204).json({
      status: 'success',
      code: 204,
      message: 'No Content',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;