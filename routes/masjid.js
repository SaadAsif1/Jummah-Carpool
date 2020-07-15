const express = require('express');
const router = express.Router();
const { requireSignin, masjidMiddleware } = require('../middleware/auth');

// Import Controllers
const {
  getSingalMasjid,
  getMasjidByCity,
  updateMasjidInfo,
  createMasjidInfo,
  getAllMasjidCities,
} = require('../controllers/masjid');

// Get Singal Masjid
router.get('/masjid/:id', requireSignin, getSingalMasjid);

// Get All Masjid Based on City
router.get('/masjid/city/:city', requireSignin, getMasjidByCity);

// Returns only citys of masjids
router.get('/masjid/all/cities', requireSignin, getAllMasjidCities);

// Create Masjid Info
router.post('/masjid/info', requireSignin, createMasjidInfo);

// Update Masjid Info
router.put('/masjid/info', requireSignin, masjidMiddleware, updateMasjidInfo);

module.exports = router;
