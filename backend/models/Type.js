const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    units_count: Number,
  },
  {
    timestamps: false,
    collection: "types",
  },
);

typeSchema.index({ id: 1 });

module.exports = mongoose.model("Type", typeSchema);
