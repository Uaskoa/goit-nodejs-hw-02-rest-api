const app = require('../app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT);
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error);
    return process.exit(1);
  });
