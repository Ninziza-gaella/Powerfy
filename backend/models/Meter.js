const mongoose = require("mongoose");
const meterSchema = new mongoose.Schema({
  meterNumber: String,

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  powerStatus: {
    type: String,
    enum: ["ON", "OFF"],
    default: "OFF"
  },

  expiresAt: Date // when power will go OFF
});
module.exports = mongoose.model("Meter", meterSchema);