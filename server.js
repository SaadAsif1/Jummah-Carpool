const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const app = express();

// Imports Routes
const authRoute = require('./routes/auth');

// dotenv
dotenv.config({ path: './config/config.env' });

// Conntect to Database
dbConnect();

// Devlopment Dependinces
if (process.env.NODE_ENV === 'development') {
  const cors = require('cors');
  const morgan = require('morgan');

  app.use(morgan('dev')); // Logs incoming requests
  app.use(cors()); // allow all orgins to access our servers
}

// Middleare
app.use(express.json());

// Serve our static assets if in productions
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Routes middlewares
app.use('/api', authRoute);

// Port Number
const PORT = process.env.PORT || 5000;

// Listen to port
app.listen(PORT, () => {
  console.log(`App listening on port is ${PORT}`);
});
