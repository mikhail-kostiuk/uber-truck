const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./routes/middleware/auth');
const users = require('./routes/api/users');
const trucks = require('./routes/api/trucks');

const PORT = process.env.PORT || 5050;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(auth);
app.use('/api/users', users);
app.use('/api/trucks', trucks);

start();

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
  } catch (err) {
    // console.log(err);
  }
}
