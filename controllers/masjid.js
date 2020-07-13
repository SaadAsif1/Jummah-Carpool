const MasjidProfile = require('../models/MasjidProfile.js');

// @ROUTE: POST /api/masjid/:id
// @DESCRIPTION: Get Singal Masjid
// @ACCESS: Private
exports.getSingalMasjid = async (req, res) => {
  const masjidProfile = await MasjidProfile.findOne({ masjid: req.params.id }).populate(
    'masjid'
  );

  if (!masjidProfile) return res.status(400).json({ error: 'No Masjid Found!' });

  res.json({ masjidProfile });
};

// @ROUTE: POST /api/masjid/city/:id
// @DESCRIPTION: Get All Masjid Based on City
// @ACCESS: Private
exports.getMasjidByCity = async (req, res) => {
  const city = req.params.city.toLowerCase().replace(/-/g, ' ');

  const masjidCity = await MasjidProfile.find({ city }).populate('masjid');

  res.json({ masjidProfile: masjidCity });
};

// @ROUTE: POST /api/masjid/info
// @DESCRIPTION: Create Masjid Info
// @ACCESS: Private
exports.createMasjidInfo = async (req, res) => {
  const { city, address, website, setup, jummahTimes } = req.body;

  const masjidProfile = await MasjidProfile.findOne({ masjid: req.profile._id });

  masjidProfile.city = city.toLowerCase();
  masjidProfile.address = address;
  masjidProfile.website = website;
  masjidProfile.setup = setup;
  masjidProfile.jummahTimes = jummahTimes;

  const result = await masjidProfile.save();
  res.json({
    masjidProfile: result.populate('masjid'),
  });
};

// @ROUTE: PUT /api/masjid/info
// @DESCRIPTION: Update Masjid Info
// @ACCESS: Private
exports.updateMasjidInfo = async (req, res) => {};
