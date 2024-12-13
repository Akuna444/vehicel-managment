const express = require("express");
const {
  addVehicle,
  updateVehicleStatus,
  getAllVehicles,
  getVehicleById,
  countVehicle,
  deleteVehicle,
  updateVehicle,
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
router.delete("/:id", protect, deleteVehicle);
router.put("/:id", protect, updateVehicle);
router.get("/count", protect, countVehicle);

module.exports = router;
