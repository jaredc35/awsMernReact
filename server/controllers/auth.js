const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { registerEmailParams } = require("../helpers/email");
const shortId = require("shortid");
const AWS = require("aws-sdk");
const expressJWT = require("express-jwt");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  // Check if user exists in DB
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is Taken"
      });
    }
    // Generate JSON Web Token with name, email, password
    const token = jwt.sign(
      { name, email, password }, // Info getting passed
      process.env.JWT_ACCOUNT_ACTIVATION, // Secret key
      {
        expiresIn: "10m" // Expires in...after this time, registration email times out
      }
    );

    // Send Email
    const params = registerEmailParams(email, token);

    const sendEmailOnRegister = ses.sendEmail(params).promise();

    sendEmailOnRegister
      .then(data => {
        console.log("Email Submitted to SES: ", data);
        res.json({
          message: `Email has been sent to ${email}. Follow the instructions to complete your registration.`
        });
      })
      .catch(error => {
        console.log("ses email on register: ", error);
        res.json({
          message: "We could not verify your email. Please try again."
        });
      });
  });
};

exports.registerActivate = (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
    if (err) {
      // Verify token hasn't expired
      return res.status(401).json({
        error: "Expired Link.  Please Register Again."
      });
    }

    const { name, email, password } = jwt.decode(token);
    console.log(name, email, password);
    const username = shortId.generate(); // Generate unique shortId

    User.findOne({ email }).exec((err, user) => {
      if (user) {
        // Check if user already exists
        return res.status(401).json({
          error: "Email is taken."
        });
      }
      // Save the user to the database
      const newUser = new User({ username, name, email, password });
      newUser.save((err, result) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            error: "Error saving user in database. Try later."
          });
        }
        return res.json({
          message: "Registration success. Please login."
        });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist.  Please register."
      });
    }
    // Else try to authenticate the user
    if (!user.authenticate(password)) {
      // Refers to User model
      return res.status(404).json({
        error: "Email and password do not match."
      });
    }
    // Generate token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role }
    });
  });
};

exports.requireSignin = expressJWT({ secret: process.env.JWT_SECRET }); // req.user is returned

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id; // Available from requireSignin Function
  User.findOne({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;
    next(); // Executes the next function
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id; // Available from requireSignin Function
  User.findOne({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({ error: "User not found" });
    }
    // check if user is admin
    if (user.role !== "admin") {
      return res.status(400).json({ error: "Admin resource.  Access denied." });
    }
    req.profile = user;
    next(); // Executes the next function
  });
};
