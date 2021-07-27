const { Schema, SchemaTypes, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Joi = require('joi');

const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Name should consist of more than two characters'],
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: SchemaTypes.ObjectId,
      // type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.plugin(mongoosePaginate);

const Contact = model('contact', contactSchema);

const validateContact = newContact => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(2).required(),
  });
  const { error } = schema.validate(newContact);
  return error;
};

const contactValidateMiddleware = (req, res, next) => {
  const error = validateContact(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    });
  }
  next();
};

module.exports = {
  Contact,
  contactValidateMiddleware,
};
