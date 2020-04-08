const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./routes/middleware/auth');
const authRoute = require('./routes/api/auth');
const trucksRoute = require('./routes/api/trucks');
const loadsRoute = require('./routes/api/loads');

const PORT = process.env.PORT || 5050;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(auth);
app.use('/api/auth', authRoute);
app.use('/api/trucks', trucksRoute);
app.use('/api/loads', loadsRoute);

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
    console.log(err);
  }
}
