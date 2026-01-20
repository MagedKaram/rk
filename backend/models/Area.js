const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    units_count: Number,
  },
  {
    timestamps: false,
    collection: "areas",
  },
);

areaSchema.index({ id: 1 });

module.exports = mongoose.model("Area", areaSchema);
