const { User } = require('./schemas/user');
// const bcrypt = require('bcryptjs');

const getById = id => User.findById(id);

const getOne = async filter => {
  return User.findOne(filter);
};

const add = async ({ email, password }) => {
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  //     return User.create({ email, password: hashPassword });
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
};

const updateById = async(id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo);
}

module.exports = {
  getById,
  getOne,
  add,
  updateById,
};
