const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/meter", require("./routes/meterRoutes"));
app.use("/api/token", require("./routes/transactionRoutes"));

module.exports = app;