const User = require("../models/User");
const Driver = require("../models/Driver");
const { driverValidation } = require("../validators/driver");

// @ROUTE: GET /api/driver/:city
// @DESCRIPTION:  Gets All drivers by city
// @ACCESS: Public
exports.getDriverByCity = async (req, res) => {
  const city = req.params.city.replace(/\s+/g, "-").toLowerCase();

  const drivers = await Driver.find({ city }).populate("user").sort("-createdAt");

  res.json({ drivers });
};

// @ROUTE: POST /api/driver/singal/:id
// @DESCRIPTION:  Get Singal Post
// @ACCESS: Public
exports.getSingalDriverPost = async (req, res) => {
  const drivers = await Driver.findOne({ _id: req.params.id })
    .populate("user")
    .sort("-createdAt");

  if (!drivers) return res.status(400).json({ error: "No post found!" });

  res.json({ drivers });
};

// @ROUTE: POST /api/driver/user/post
// @DESCRIPTION:  Get All User Posts
// @ACCESS: Private
exports.getAllUserDriverPosts = async (req, res) => {
  console.log(req.user._id, "skdjfklsdklfjklsdjfkldsj");
  const driverPost = await Driver.find({ user: req.user._id })
    .populate("user")
    .sort("-createdAt");

  res.json({ driverPost });
};

// @ROUTE: POST /api/driver/create
// @DESCRIPTION: Creates A Driver
// @ACCESS: Private
exports.createsDriverPost = async (req, res) => {
  // Validate Incoming body request
  const { error, value } = driverValidation(req.body);

  // If error with request
  if (error) return res.status(400).json({ error: error.details[0].message });

  const {
    masjid_location,
    time_leaving,
    jumma_timings,
    current_location,
    city,
    phone_number,
    message,
  } = value;

  // Get Signed in user
  const signedInUser = await User.findOne({ _id: req.user._id });

  // Create New Driver
  const newDriver = new Driver({
    user: signedInUser,
    masjid_location,
    time_leaving,
    jumma_timings,
    current_location,
    city: city.replace(/\s+/g, "-").toLowerCase(),
    phone_number,
    message,
  });

  // Save To  Db
  const result = await newDriver.save();

  res.json({ driver: result.populate("user"), message: "Post successfully created!" });
};

// @ROUTE: PUT /api/driver/update/:id
// @DESCRIPTION: Updates a User Post
// @ACCESS: Private
exports.updateDriverPost = async (req, res) => {
  const driverPost = await Driver.findOne({ _id: req.params.id }).populate("user");

  if (!driverPost) return res.status(400).json({ error: "No post found!" });

  const {
    masjid_location,
    time_leaving,
    jumma_timings,
    current_location,
    city,
    phone_number,
    message,
  } = req.body;

  if (masjid_location) driverPost.masjid_location = masjid_location;
  if (time_leaving) driverPost.time_leaving = time_leaving;
  if (jumma_timings) driverPost.jumma_timings = jumma_timings;
  if (current_location) driverPost.current_location = current_location;
  if (city) driverPost.city = city;
  if (phone_number) driverPost.phone_number = phone_number;
  if (message) driverPost.message = message;

  const result = await driverPost.save();

  res.json({ message: "Successfully updated post!", result });
};

// @ROUTE: DELETE /api/driver/delete/:id
// @DESCRIPTION: Deletes A Driver
// @ACCESS: Private
exports.deleteDriverPost = (req, res) => {};
