const express = require("express");
const Lead = require("../models/Lead");
const authMiddleware = require("../middleware/authMiddleware");
const { buildFilter } = require("../controllers/queryHelper");

const router = express.Router();

// GET leads with pagination + filters
router.get("/", authMiddleware, async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const filter = buildFilter(req.query);

    // sorting
    let sort = { createdAt: -1 };
    if (req.query.sort) {
      const [field, dir] = req.query.sort.split(":");
      sort = { [field]: dir === "asc" ? 1 : -1 };
    }

    const [total, leads] = await Promise.all([
      Lead.countDocuments(filter),
      Lead.find(filter).sort(sort).skip(skip).limit(limit)
    ]);

    res.json({
      data: leads,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a lead 
router.post("/", authMiddleware, async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET a single lead by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a lead by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a lead by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
