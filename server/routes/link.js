const express = require("express");
const router = express.Router();

// Import validators
const {
  linkCreateValidator,
  linkUpdateValidator
} = require("../validators/link");
const { runValidation } = require("../validators/");

// Import controllers
const { requireSignin, authMiddleware } = require("../controllers/auth");
const { create, list, read, update, remove } = require("../controllers/link");

// routes
router.post(
  "/link",
  linkCreateValidator, // Must past validation
  runValidation,
  requireSignin, // Signed in
  authMiddleware, // Admin
  create
);

router.get(
  // List all
  "/link",
  list
);

router.get(
  // Get one
  "/category/:slug",
  read
);

router.put(
  // Update one
  "/link/:slug",
  linkUpdateValidator, // Must past validation
  runValidation,
  requireSignin, // Signed in
  authMiddleware, // Admin
  update
);

router.delete(
  // Delete one
  "/link/:slug",
  requireSignin, // Signed in
  authMiddleware, // Admin
  remove
);

module.exports = router;
