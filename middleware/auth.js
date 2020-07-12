const User = require('../models/User');
const jwt = require('jsonwebtoken');

// MIDDLE WARE FOR EXPRESS JWT TO SEE IF TOKEN GIVEN IS ISSUES BY OUR APPLICATION
// Middleware to acces protected routes
exports.requireSignin = (req, res, next) => {
  // It checks if were sending a request that the header has that token
  const token = req.header('auth-token');

  // If it dosent
  if (!token) return res.status(401).send('Access Denied');

  // Verfying the token
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; //<--- this verfied is going to gives us the id we assigne jwt
    next();
  } catch (err) {
    res.status(401).send('Invalid Token');
  }
};

// THIS IS A MIDDLE WARE FOR masjid TO CHECK IF USER IS A masjid
exports.masjidMiddleware = (req, res, next) => {
  User.findById({ _id: req.user._id }).exec((err, user) => {
    // If error or no user sends user no found
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    // If role does not a masjid -- true
    if (user.role !== 'masjid') {
      return res.status(400).json({
        error: 'masjid resource. Access denied.',
      });
    }

    // req.profile -- assigned the user account to that variable
    req.profile = user;
    next();
  });
};
