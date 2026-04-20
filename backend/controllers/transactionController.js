const Transaction = require("../models/Transaction");
const Meter = require("../models/Meter");

// BUY TOKEN
exports.buy = async (req, res) => {
  try {
    const { meterNumber, amount } = req.body;

    const token = "MTN-" + Math.floor(Math.random() * 1e12);

    const tx = await Transaction.create({
      meterNumber,
      amount,
      token,
    });

    res.json({
      message: "Token generated",
      token,
    });
  } catch (err) {
    res.status(500).send("ERROR");
  }
};

// VERIFY TOKEN (ESP32 USES THIS)
exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.query;

    const tx = await Transaction.findOne({ token });
    if (!tx) return res.status(400).send("INVALID");

    const meter = await Meter.findOne({ meterNumber: tx.meterNumber });
    if (!meter) return res.status(404).send("METER NOT FOUND");

    const now = new Date();
    const extraTime = 60 * 60 * 1000; // 1 hour power

    if (meter.expiresAt && meter.expiresAt > now) {
      meter.expiresAt = new Date(meter.expiresAt.getTime() + extraTime);
    } else {
      meter.expiresAt = new Date(now.getTime() + extraTime);
    }

    meter.powerStatus = "ON";

    await meter.save();

    res.send("VALID");
  } catch (err) {
    res.status(500).send("ERROR");
  }
};