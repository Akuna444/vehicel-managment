const Vehicle = require("../models/Vehicle");

exports.addVehicle = async (req, res) => {
  const { name, make, model, year, status } = req.body;
  const image = req.file ? req.file.path : null;
  const vehicle = new Vehicle({ name, make, model, year, status, image });
  const savedVehicle = await vehicle.save();
  res.status(201).json(savedVehicle);
};

exports.updateVehicleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedVehicle = await Vehicle.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  res.status(200).json(updatedVehicle);
};

exports.updateVehicle = async (req, res) => {
  const { id } = req.params;

  const updatedVehicle = await Vehicle.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedVehicle);
};
exports.getAllVehicles = async (req, res) => {
  const vehicles = await Vehicle.find().sort({ createdAt: -1 });
  res.status(200).json(vehicles);
};

exports.getVehicleById = async (req, res) => {
  const { id } = req.params;
  const vehicle = await Vehicle.findById(id);
  res.status(200).json(vehicle);
};

exports.countVehicle = async (req, res) => {
  const count = await Vehicle.countDocuments();
  res.status(200).json({ count });
};

exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    await Vehicle.findByIdAndDelete(id);
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error);
  }
};
