const express = require("express");
const router = express.Router();
const Unit = require("../models/Unit");

// GET جميع الوحدات مع الـ Pagination والـ Filtering
router.get("/", async (req, res) => {
  try {
    // Build filter query
    const filter = {};

    if (req.query.minPrice) {
      filter.price = { ...filter.price, $gte: parseInt(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      filter.price = { ...filter.price, $lte: parseInt(req.query.maxPrice) };
    }
    if (req.query.bedrooms) {
      filter.bedrooms = req.query.bedrooms;
    }
    if (req.query.area_id) {
      filter.area_id = parseInt(req.query.area_id);
    }
    if (req.query.type_id) {
      filter.type_id = parseInt(req.query.type_id);
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Get total count
    const total = await Unit.countDocuments(filter);

    // Get units
    const units = await Unit.find(filter).skip(skip).limit(limit).lean();

    res.json({
      success: true,
      data: units,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching units:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET وحدة محددة
router.get("/:id", async (req, res) => {
  try {
    const unit = await Unit.findOne({ id: parseInt(req.params.id) }).lean();

    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }

    res.json({ success: true, data: unit });
  } catch (error) {
    console.error("Error fetching unit:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET وحدات المشروع
router.get("/project/:projectId", async (req, res) => {
  try {
    const units = await Unit.find({
      project_id: parseInt(req.params.projectId),
    }).lean();

    res.json({
      success: true,
      data: units,
      count: units.length,
    });
  } catch (error) {
    console.error("Error fetching project units:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
