const express = require('express');
const router = express.Router();

// Import Controller
const {
  signup,
  signin,
  activation,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');

// Sign Up a User
router.post('/signup', signup);

// Acctivate User Account / Then save to Database
router.post('/activate-account', activation);

// Signup a User
router.post('/signin', signin);

// forgot password
router.put('/forgot-password', forgotPassword);

// reset password
router.put('/reset-password', resetPassword);

module.exports = router;
