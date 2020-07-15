const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const User = require('../models/User');
const {
  signupValidation,
  singinValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require('../validators/auth');

// @ROUTE: POST /api/signup
// @DESCRIPTION: Sign Up Users
// @ACCESS: Public
exports.signup = async (req, res) => {
  // Validate Incoming body request
  const { error, value } = signupValidation(req.body);

  // If error with request
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, email, password, age, masjid } = value;

  // Check if user is in database
  const user = await User.findOne({ email });

  // If email is taken send back error
  if (user) return res.status(400).json({ error: 'Email is already taken' });

  // Assign Token to user (Account Validation)
  const token = jwt.sign(
    { name, email, password, age, masjid },
    process.env.JWT_ACCOUNT_ACTIVATION,
    {
      expiresIn: '10m',
    }
  );

  // Send Email to User So they can validate there account trought link
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Jummah <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Account Activation Link',
    html: `
     <div>
       <h1>Please use the following link to activate your account</h1>
       <h3>${process.env.CLIENT_URL}/auth/activate/${token}</h3>
       <hr/>
       <p>This email may contain sensetive information</p>
       <p>${process.env.CLIENT_URL}</p>
     </div>
     `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    // If email is sent succesfully
    if (info)
      return res.json({
        message: `Email has been sent to ${email}. Follow the instructions to activate your account.`,
      });

    // If email unsuccsfully sent
    if (error) return res.json({ error });
  });
};

// @ROUTE: POST /api/activate-account
// @DESCRIPTION: Acctivate User Account
// @ACCESS: Private
exports.activation = async (req, res) => {
  const { token } = req.body;
  if (!token) res.status(400).json({ error: 'Token is required!' });

  // Check if token is expired
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async (err, decoded) => {
      //If Error Decoding and expired token
      if (err) {
        console.log('JWT ACCOUNT ACTIVATION ERROR', err);
        return res.status(401).json({ error: 'Expired link. Please sign up again.' });
      }

      const { name, age, email, password, masjid } = jwt.decode(token);

      // Check if account is already activated
      const activeuser = await User.findOne({ email });

      if (activeuser) {
        return res.status(400).json({ error: 'Account is already activated' });
      }

      // If token succfuly decoded
      try {
        const user = new User({
          name,
          email,
          age,
          password,
        });

        // if (JSON.parse(masjid)) {
        //   // Create new User Masjid
        //   user = new User({
        //     name,
        //     email,
        //     age,
        //     password,
        //     role: 'masjid',
        //   });

        //   // create Random username
        //   const newMasjidProfile = new MasjidProfile({
        //     masjid: user,
        //   });

        //   await newMasjidProfile.save();
        // } else {
        //   // Create new User
        //   user = new User({
        //     name,
        //     email,
        //     age,
        //     password,
        //   });
        // }

        // Save User to database
        const result = await user.save();

        // Send Cleint response
        res.json({
          message: 'Account successfully activated please sign in!',
          user: result,
        });
      } catch (err) {
        res.status(401).json({ error: err });
      }
    });
  }
};

// @ROUTE: POST /api/signin
// @DESCRIPTION: Sign In Users
// @ACCESS: Public
exports.signin = async (req, res) => {
  const { error, value } = singinValidation(req.body);

  // If error we send to client
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = value;

  // Find email in database
  const user = await User.findOne({ email });

  // If no user email doesn't exist
  if (!user) return res.status(401).json({ error: 'Email and password do not match' });

  // See if user email matches with password
  if (!user.authenticate(password)) {
    return res.status(401).json({ error: 'Email and password do not match' });
  }

  // If email and username match (GENTERATE TOKEN)
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  const { _id, name, role, age } = user;

  // Send the user
  res.json({ token, user: { _id, name, email: user.email, role, age } });
};

// @ROUTE: POST /api/forgot-password
// @DESCRIPTION: When users forget password
// @ACCESS: Public
exports.forgotPassword = async (req, res) => {
  const { error, value } = forgotPasswordValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email } = value;

  // Check if user exist
  const user = await User.findOne({ email });

  // if no user send error
  if (!user) return res.status(400).json({ error: 'No existing user with that email' });

  // Assign Token to user (Forgot Password)
  const token = jwt.sign(
    { _id: user._id, name: user.name },
    process.env.JWT_ACCOUNT_ACTIVATION,
    {
      expiresIn: '10m',
    }
  );

  // Send Email to User So they can reset there password trough link
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Jummah <${process.env.EMAIL_FROM}>`,
    to: user.email,
    subject: 'Password Reset Link',
    html: `
  <div>
    <h1>Please use the following link to reset your password</h1>
    <h3>${process.env.CLIENT_URL}/auth/password/reset/${token}</h3>
    <hr/>
    <p>This email may contain sensetive information</p>
    <p>${process.env.CLIENT_URL}</p>
  </div>
  `,
  };

  const updateResetPasswordLink = await user.updateOne({ resetPasswordLink: token });

  transporter.sendMail(mailOptions, function (error, info) {
    // If email is sent succesfully
    if (info)
      return res.json({
        message: `Email has been sent to ${user.email}. Follow the instructions to reset your password.`,
      });

    // If email unsuccsfully sent
    if (error) return res.json({ error });
  });
};

// @ROUTE: POST /api/reset-password
// @DESCRIPTION: Users reset password
// @ACCESS: Private
exports.resetPassword = async (req, res) => {
  const { error, value } = resetPasswordValidation(req.body);

  // if error with reqest  send back
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { resetPasswordLink, newPassword } = value;

  // check token sent from client
  jwt.verify(
    resetPasswordLink,
    process.env.JWT_ACCOUNT_ACTIVATION,
    async (err, decoded) => {
      // If Link is expired
      if (err) {
        return res.status(400).json({ error: 'Expired link try again!' });
      }

      // Find User
      const user = await User.findOne({ resetPasswordLink });

      if (!user) {
        return res.status(400).json({ error: 'Something when Wrong try again! ' });
      }

      const updatedFeilds = {
        password: newPassword,
        resetPasswordLink: '',
      };

      // lodash replaces the object key value with new key value
      newUser = _.extend(user, updatedFeilds);

      const result = await newUser.save();

      res.json({ message: 'Great! Now you can login with your new password!' });
    }
  );
};
