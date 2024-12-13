const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    image: { type: String }, // Stores the path of the uploaded image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
