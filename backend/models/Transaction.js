const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  meterNumber: String,
  amount: Number,
  token: String,
  units: Number,
  provider: String,
  status: { 
    type: String, 
    default: "success" 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);