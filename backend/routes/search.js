const express = require("express");
const router = express.Router();
const Unit = require("../models/Unit");

// البحث المتقدم
router.get("/", async (req, res) => {
  try {
    const query = req.query.q?.toLowerCase() || "";

    if (!query) {
      return res.status(400).json({ error: "Search query required" });
    }

    // استخدام text search في MongoDB
    const results = await Unit.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { project_name: { $regex: query, $options: "i" } },
        { area_name: { $regex: query, $options: "i" } },
        { developer_name: { $regex: query, $options: "i" } },
        { type_name: { $regex: query, $options: "i" } },
      ],
    });

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = results.length;
    const paginatedResults = results.slice(skip, skip + limit);

    res.json({
      success: true,
      query,
      data: paginatedResults,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
