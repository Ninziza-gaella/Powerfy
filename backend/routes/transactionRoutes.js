const router = require("express").Router();
const tx = require("../controllers/transactionController");
const auth = require("../middleware/authMiddleware");

router.post("/buy", auth, tx.buy);
router.get("/verify", tx.verifyToken);
module.exports = router;