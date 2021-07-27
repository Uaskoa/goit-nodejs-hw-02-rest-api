const { Contact } = require('./schemas/contact');

// const get = async () => {
//   return Contact.find();
// };

const get = async query => {
  const options = {
    page: query.page || 1,
    limit: query.limit || 20,
  };

  return await Contact.paginate({}, options);
};

// const get = async query => {
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
//     console.log(result);
//     console.log(options.favorite);
//     result.docs.filter(doc => (doc.favorite = options.favorite));
//   });

//   //  function( err,result){
//   //     if (query.favorite !== null) {
//   //       options.favorite = query.favorite;
//   //     }
//   //  return (result.docs.filter(doc => doc.favorite=false));
//   // }
// };

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
