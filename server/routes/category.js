const express = require("express");
const router = express.Router();

// Import validators
const {
  categoryCreateValidator,
  categoryUpdateValidator
} = require("../validators/category");
const { runValidation } = require("../validators/");

// Import controllers
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const {
  create,
  list,
  read,
  update,
  remove
} = require("../controllers/category");

// routes
router.post(
  "/category",
  categoryCreateValidator, // Must past validation
  runValidation,
  requireSignin, // Signed in
  adminMiddleware, // Admin
  create
);

router.get(
  // List all
  "/category",
  list
);

router.get(
  // Get one
  "/category/:slug",
  read
);

router.put(
  // Update one
  "/category/:slug",
  categoryUpdateValidator, // Must past validation
  runValidation,
  requireSignin, // Signed in
  adminMiddleware, // Admin
  update
);

router.delete(
  // Delete one
  "/category/:slug",
  requireSignin, // Signed in
  adminMiddleware, // Admin
  remove
);

module.exports = router;
