const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    developer_id: Number,
    developer_name: String,
    area_id: Number,
    area_name: String,
    units_count: Number,
  },
  {
    timestamps: false,
    collection: "projects",
  },
);

projectSchema.index({ id: 1 });
projectSchema.index({ developer_id: 1 });
projectSchema.index({ area_id: 1 });

module.exports = mongoose.model("Project", projectSchema);
