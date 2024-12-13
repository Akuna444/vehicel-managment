const express = require("express");
const { body } = require("express-validator");
const { validate } = require("../middlewares/validation");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  validate([
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ]),
  register
);

router.post(
  "/login",
  validate([
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ]),
  login
);

module.exports = router;
