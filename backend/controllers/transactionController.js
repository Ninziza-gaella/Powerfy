exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.query;

    const tx = await Transaction.findOne({ token });
    if (!tx) return res.status(400).send("INVALID");

    const meter = await Meter.findOne({ meterNumber: tx.meterNumber });

    const now = new Date();
    const extraTime = 60 * 60 * 1000; // 1 hour

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