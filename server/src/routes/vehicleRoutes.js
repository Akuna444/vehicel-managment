const express = require("express");
const {
  addVehicle,
  updateVehicleStatus,
  getAllVehicles,
  getVehicleById,
  countVehicle,
} = require("../controllers/vehicleController");
const upload = require("../middlewares/upload");

const { validate } = require("../middlewares/validation");
const { protect } = require("../middlewares/authMiddleware");
const { vehicleValidationRules } = require("../validations/vehicleValidation");

const router = express.Router();

router.post(
  "/add",
  protect,
  // validate(vehicleValidationRules),
  upload.single("image"),
  addVehicle
);
router.patch("/:id/status", protect, updateVehicleStatus);
router.get("/all", protect, getAllVehicles);
router.get("/one/:id", protect, getVehicleById);
router.get("/count", protect, countVehicle);

module.exports = router;
