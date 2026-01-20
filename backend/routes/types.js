const express = require("express");
const router = express.Router();
const Type = require("../models/Type");
const Unit = require("../models/Unit");

// GET جميع الأنواع
router.get("/", async (req, res) => {
  try {
    const types = await Type.find().lean();

    res.json({
      success: true,
      data: types,
      count: types.length,
    });
  } catch (error) {
    console.error("Error fetching types:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET وحدات من نوع محدد
router.get("/:id/units", async (req, res) => {
  try {
    const type = await Type.findOne({ id: parseInt(req.params.id) }).lean();

    if (!type) {
      return res.status(404).json({ error: "Type not found" });
    }

    const units = await Unit.find({ type_id: type.id }).limit(5).lean();

    res.json({
      success: true,
      data: {
        ...type,
        sample_units: units,
      },
    });
  } catch (error) {
    console.error("Error fetching type units:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
