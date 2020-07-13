const express = require('express');
const router = express.Router();
const { requireSignin, masjidMiddleware } = require('../middleware/auth');

// Import Controllers
const {
  getSingalMasjid,
  getMasjidByCity,
  updateMasjidInfo,
  createMasjidInfo,
} = require('../controllers/masjid');

// Get Singal Masjid
router.get('/masjid/:id', requireSignin, getSingalMasjid);

// Get All Masjid Based on City
router.get('/masjid/city/:city', requireSignin, getMasjidByCity);

// Create Masjid Info
router.post('/masjid/info', requireSignin, masjidMiddleware, createMasjidInfo);

// Update Masjid Info
router.put('/masjid/info', requireSignin, masjidMiddleware, updateMasjidInfo);

module.exports = router;
