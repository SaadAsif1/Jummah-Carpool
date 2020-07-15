const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const sslRedirect = require('heroku-ssl-redirect');
const app = express();

// enable ssl redirect
app.use(sslRedirect());

// Imports Routes
const authRoute = require('./routes/auth');
const masjidRoute = require('./routes/masjid');

// dotenv
dotenv.config({ path: './config/config.env' });

// Conntect to Database
dbConnect();

// Middleware
app.use(express.json());

// Routes middlewares
app.use('/api', authRoute);
app.use('/api', masjidRoute);

// Serve our static assets if in productions
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Port Number
const PORT = process.env.PORT || 5000;

// Listen to port
app.listen(PORT, () => {
  console.log(`App listening on port is ${PORT}`);
});

// Devlopment Dependinces
// if (process.env.NODE_ENV === 'development') {
//   // const cors = require('cors');
//   // const morgan = require('morgan');
//   // app.use(morgan('dev')); // Logs incoming requests
//   // app.use(cors()); // allow all orgins to access our servers
// }
