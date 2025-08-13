const { validationResult } = require("express-validator");

const validationError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};

module.exports = validationError;
