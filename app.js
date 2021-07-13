const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// require('dotenv').config()
const { Schema, model } = mongoose;

const { DB_HOST, PORT = 3000 } = process.env;

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/v1/contacts', contactsRouter);

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT)
    console.log('Database connection successful');
  })
  .catch(error => console.log(error));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

// mongoose
//   .connect(DB_HOST, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   })
//   .then(async () => {
//     const newContact = {
//       name: 'Alla',
//       email: 'alla@mail.com',
//       phone: '(111) 222-3333',
//     };
//     try {
//       const result = await Contact.create(newContact)
//       console.log(result);
//       console.log('Database connection successful');
//     } catch (error) {
//       console.log(error);
//     }

//     Contact.create(newContact, (error, data) => {
//       if (error) {
//         console.log(error);
//         return;
//       }
//       console.log(data);
//     });
//   })
//   .catch(error => console.log(error));
