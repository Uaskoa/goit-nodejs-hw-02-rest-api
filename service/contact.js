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

// NOT WORKING const get = async query => {
//   // console.log(query);
//   const options = {
//     page: query.page || 1,
//     limit: query.limit || 20,
//     favorite: null,
//   };

//   if (query.favorite !== null) {
//     options.favorite = query.favorite;
//   }

//   console.log(options);

//   return await Contact.paginate({}, options, function (err, result) {
//     if(err) {
//       console.log(error)
//     }
//     console.log(result);

//     console.log(options.favorite);
//     return result.docs.filter(doc => doc.favorite === options.favorite);
//   });

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
