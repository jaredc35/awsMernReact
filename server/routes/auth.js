const express = require("express");
const router = express.Router();

// Import validators
const {
  userRegisterValidator,
  userLoginValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require("../validators/auth");
const { runValidation } = require("../validators/");

// Import from controllers
const {
  register,
  registerActivate,
  login,
  requireSignin,
  forgotPassword,
  resetPassword
} = require("../controllers/auth");

// Only for setting up/logging in
router.post("/register", userRegisterValidator, runValidation, register);
router.post("/register/activate", registerActivate);
router.post("/login", userLoginValidator, runValidation, login);
router.put(
  "/forgot-password",
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  "/reset-password",
  resetPasswordValidator,
  runValidation,
  resetPassword
);

// router.get("/secret", requireSignin, (req, res) => {
//   // requireSignin requires a valid token
//   res.json({
//     data: "Secret is for logged in users only"
//   });
// });

module.exports = router;
