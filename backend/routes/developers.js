const express = require("express");
const router = express.Router();
const Developer = require("../models/Developer");
const Project = require("../models/Project");

// GET جميع الشركات
router.get("/", async (req, res) => {
  try {
    const developers = await Developer.find().lean();

    res.json({
      success: true,
      data: developers,
      count: developers.length,
    });
  } catch (error) {
    console.error("Error fetching developers:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET شركة محددة مع مشاريعها
router.get("/:id", async (req, res) => {
  try {
    const developer = await Developer.findOne({
      id: parseInt(req.params.id),
    }).lean();

    if (!developer) {
      return res.status(404).json({ error: "Developer not found" });
    }

    const projects = await Project.find({ developer_id: developer.id })
      .limit(5)
      .lean();

    res.json({
      success: true,
      data: {
        ...developer,
        projects: projects,
      },
    });
  } catch (error) {
    console.error("Error fetching developer:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
