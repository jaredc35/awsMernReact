const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { registerEmailParams } = require("../helpers/email");
const shortId = require("shortid");
const AWS = require("aws-sdk");

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
