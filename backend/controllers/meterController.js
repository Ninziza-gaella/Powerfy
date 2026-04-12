const Meter = require("../models/Meter");

exports.createMeter = async (req, res) => {
  const { meterNumber } = req.body;

  const meter = await Meter.create({
    meterNumber,
    user: req.user.id,
  });

  res.json(meter);
};

exports.getMeter = async (req, res) => {
  const meter = await Meter.findOne({ meterNumber: req.params.id });

  if (!meter) return res.status(404).json({ error: "Not found" });

  res.json({
    units: meter.units,
    status: meter.status,
  });
};