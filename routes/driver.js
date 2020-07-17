const express = require('express');
const router = express.Router();
const { requireSignin } = require('../middleware/auth');

// Import Controllers
const {
  getDriverByCity,
  getSingalDriverPost,
  getAllUserDriverPosts,
  createsDriverPost,
  updateDriverPost,
  deleteDriverPost,
} = require('../controllers/driver');

// Gets All drivers by city
router.get('/driver/:city', getDriverByCity);

// Get Singal Post
router.get('/driver/singal/:id', getSingalDriverPost);

// Get All User Posts
router.get('/driver/user/post', requireSignin, getAllUserDriverPosts);

// Creates A Driver
router.post('/driver/create', requireSignin, createsDriverPost);

// Updates a User Post
router.put('/driver/update/:id', requireSignin, updateDriverPost);

// Deletes A Driver
router.delete('/driver/delete/:id', requireSignin, deleteDriverPost);

module.exports = router;
