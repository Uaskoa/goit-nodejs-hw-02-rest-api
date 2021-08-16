const service = require('../../service');

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;

  const updatedSubscription = req.body.subscription;
;
  try {
    if (!updatedSubscription) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'field subscription is missing ',
      });
    }
    await service.user.updateById(_id, { subscription: updatedSubscription });

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        subscription: updatedSubscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
