const { check } = require("express-validator");

exports.linkCreateValidator = [
  check("title")
    .not()
    .isEmpty()
    .withMessage("Name is required"),
  check("url")
    .not()
    .isEmpty()
    .withMessage("URL is required."),
  check("categories")
    .not()
    .isEmpty()
    .withMessage("At least 1 category is required."),
  check("type")
    .not()
    .isEmpty()
    .withMessage("Pick a type free/paid."),
  check("medium")
    .not()
    .isEmpty()
    .withMessage("Pick a medium.")
];

exports.linkUpdateValidator = [
  check("title")
    .not()
    .isEmpty()
    .withMessage("Name is required"),
  check("url")
    .not()
    .isEmpty()
    .withMessage("URL is required."),
  check("categories")
    .not()
    .isEmpty()
    .withMessage("At least 1 category is required."),
  check("type")
    .not()
    .isEmpty()
    .withMessage("Pick a type free/paid."),
  check("medium")
    .not()
    .isEmpty()
    .withMessage("Pick a medium.")
];
