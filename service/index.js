const { Contact } = require('./schemas/contact');

const get = async () => {
  return Contact.find();
};

const getById = async id => {
  return Contact.findById(id);
};

const add = async body => {
  return Contact.create(body);
};

const remove = async id => {
  return Contact.findByIdAndDelete(id);
};

const update = async (id, data) => {
  return Contact.findByIdAndUpdate(id, data);
};

const updateStatus = async (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  get,
  getById,
  add,
  remove,
  update,
  updateStatus,
};
