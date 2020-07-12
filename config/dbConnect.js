const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(console.log('MongoDB Connected!'))
    .catch((err) => {
      console.log(`MongoDB Error ${err}!`);
    });
};

module.exports = connectDB;
