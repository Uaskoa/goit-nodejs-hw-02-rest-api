const { Contact } = require('./schemas/contact');

// const get = async () => {
//   return Contact.find();
// };

const get = async query => {
  const { page, limit } = query;
  const options = {
    page: page || 1,
    limit: limit || 20,
  };

  return await Contact.paginate({}, options);
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
