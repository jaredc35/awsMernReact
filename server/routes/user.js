const express = require("express");
const router = express.Router();

// Import middlewares
const {
  requireSignin,
  authMiddleware,
  adminMiddleware
} = require("../controllers/auth");

// Import controllers
const { read } = require("../controllers/user");

// Routes
router.get("/user", requireSignin, authMiddleware, read);
router.get("/admin", requireSignin, adminMiddleware, read);

module.exports = router;
