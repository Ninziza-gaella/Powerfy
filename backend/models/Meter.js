const mongoose = require("mongoose");
const meterSchema = new mongoose.Schema({
  meterNumber: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  powerStatus: {
    type: String,
    enum: ["ON", "OFF"],
    default: "OFF"
  },

  expiresAt: Date
});
module.exports = mongoose.model("Meter", meterSchema);