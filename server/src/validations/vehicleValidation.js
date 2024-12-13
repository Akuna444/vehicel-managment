const { body } = require("express-validator");

exports.vehicleValidationRules = [
  body("name").notEmpty().withMessage("Vehicle name is required"),
  body("make").notEmpty().withMessage("Vehicle make is required"),
  body("model").notEmpty().withMessage("Vehicle model is required"),
  body("year")
    .isInt({ min: 1886 })
    .withMessage("Vehicle year must be a valid number"),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Invalid status value"),
];
