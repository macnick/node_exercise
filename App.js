const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./routes/users');
const messageRouter = require('./routes/messages');

app.use(
  morgan('dev', {
    skip: function (req, res) {
      return res.statusCode > 400;
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Set response headers
  res.header('Access-Control-Allow-Origin', '*'); // Allow access to any (*) site
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  ); // We set which kind of headers we want to accept

  // Set available request methods
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next(); // Go to next middleware
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Node.js exercise!',
  });
});

app.use((req, res, next) => {
  const error = new Error('No route was found for this request!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const sequelize = require('./db');
sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

module.exports = app;
