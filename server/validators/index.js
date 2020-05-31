const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      // 422 => Unprocessable entity
      error: errors.array()[0].msg // Show the First error msg
    });
  }
  next();
};
