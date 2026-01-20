const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    slug: String,
    url: String,
    name: String,
    project_id: Number,
    project_name: String,
    developer_id: Number,
    developer_name: String,
    area_id: Number,
    area_name: String,
    nature_id: Number,
    nature_name: String,
    type_id: Number,
    type_name: String,
    price: Number,
    currency: String,
    area_sq_m: Number,
    bedrooms: String,
    baths: Number,
    delivery_year: Number,
    created: Date,
    modified: Date,
    lat: String,
    lng: String,
    images: [String],
    payment_down_prices: [String],
    payment_installment_years: [String],
    payment_down_percent: [String],
  },
  {
    timestamps: false,
    collection: "units",
  },
);

// Indexes for better performance
unitSchema.index({ id: 1 });
unitSchema.index({ project_id: 1 });
unitSchema.index({ developer_id: 1 });
unitSchema.index({ area_id: 1 });
unitSchema.index({ type_id: 1 });
unitSchema.index({ price: 1 });
unitSchema.index({ area_sq_m: 1 });
unitSchema.index({
  project_name: "text",
  developer_name: "text",
  area_name: "text",
  type_name: "text",
});

module.exports = mongoose.model("Unit", unitSchema);
