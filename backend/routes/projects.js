const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Unit = require("../models/Unit");

// GET جميع المشاريع
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Project.countDocuments();
    const projects = await Project.find().skip(skip).limit(limit).lean();

    res.json({
      success: true,
      data: projects,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET مشروع محدد مع وحداته
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findOne({
      id: parseInt(req.params.id),
    }).lean();

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const units = await Unit.find({ project_id: project.id }).limit(10).lean();

    res.json({
      success: true,
      data: {
        ...project,
        units: units,
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET مشاريع حسب الشركة
router.get("/developer/:developerId", async (req, res) => {
  try {
    const projects = await Project.find({
      developer_id: parseInt(req.params.developerId),
    }).lean();

    res.json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (error) {
    console.error("Error fetching developer projects:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
