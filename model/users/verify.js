const service = require('../../service');

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await service.user.getOne({ verifyToken: verificationToken });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      });
    }
    await service.user.updateById(user._id, {
      verify: true,
      verifyToken: null,
    });
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Verification successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
