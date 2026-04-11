const mongoose = require("mongoose");

const meterSchema = new mongoose.Schema({
  meterNumber: { type: String, required: true, unique: true },
  ownerName: String,
});

module.exports = mongoose.model("Meter", meterSchema);