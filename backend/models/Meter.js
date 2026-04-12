const meterSchema = new mongoose.Schema({
  meterNumber: String,

  powerStatus: {
    type: String,
    enum: ["ON", "OFF"],
    default: "OFF"
  },

  expiresAt: Date // when power will go OFF
});