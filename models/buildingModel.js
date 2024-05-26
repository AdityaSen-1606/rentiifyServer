const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Building = mongoose.model("Building", buildingSchema);

module.exports = Building;
