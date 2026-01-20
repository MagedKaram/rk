const express = require("express");
const router = express.Router();
const Area = require("../models/Area");

// GET جميع المناطق
router.get("/", async (req, res) => {
  try {
    const areas = await Area.find().lean();

    res.json({
      success: true,
      data: areas,
      count: areas.length,
    });
  } catch (error) {
    console.error("Error fetching areas:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET منطقة محددة
router.get("/:id", async (req, res) => {
  try {
    const area = await Area.findOne({ id: parseInt(req.params.id) }).lean();

    if (!area) {
      return res.status(404).json({ error: "Area not found" });
    }

    res.json({
      success: true,
      data: area,
    });
  } catch (error) {
    console.error("Error fetching area:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
