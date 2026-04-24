//Get Meter
exports.getMeter = async (req, res) => {
  try {
    const meter = await Meter.findOne({
       meterNumber: req.params.id,
       user:req.user.id
      });

    if (!meter) {
      return res.status(404).json({ error: "Not found" });
    }

    // OPTIONAL: auto-expiry check
    if (meter.expiresAt && new Date() > meter.expiresAt) {
      meter.powerStatus = "OFF";
      meter.expiresAt = null;
      await meter.save();
    }

    let message = "No power";

if (meter.powerStatus === "ON") {
  message = "Power available";
}

res.json({
  status: meter.powerStatus,
  expiresAt: meter.expiresAt,
  message
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Create Meter
exports.createMeter = async (req, res) => {
  try {
    const meterNumber = req.body.meterNumber?.trim();

    if (!meterNumber) {
      return res.status(400).json({ error: "Meter number required" });
    }

    const exists = await Meter.findOne({ meterNumber });
    if (exists) {
      return res.status(400).json({ error: "Meter already exists" });
    }

    const meter = await Meter.create({
      meterNumber,
      user: req.user.id,
      powerStatus: "OFF"
    });

    res.json(meter);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
