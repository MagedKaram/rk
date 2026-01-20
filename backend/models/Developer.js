const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    projects_count: Number,
    units_count: Number,
  },
  {
    timestamps: false,
    collection: "developers",
  },
);

developerSchema.index({ id: 1 });

module.exports = mongoose.model("Developer", developerSchema);
