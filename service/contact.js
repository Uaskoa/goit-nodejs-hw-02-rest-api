const { Contact } = require('./schemas/contact');

// const get = async () => {
//   return Contact.find();
// };

const get = async (query, userId) => {
  const { page, limit, favorite } = query;
  console.log(userId);
  const options = {
    page: page || 1,
    limit: limit || 20,
  };

  const queryList = { owner: userId };
  if (favorite) {
    queryList.favorite = favorite;
  }

  return await Contact.paginate(queryList, options);
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
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  get,
  getById,
  add,
  remove,
  update,
};
