const router = require("express").Router();
const meter = require("../controllers/meterController");
const auth = require("../middleware/authMiddleware");

router.post("/:id", auth, meter.createMeter);
router.get("/:id", meter.getMeter);

module.exports = router;