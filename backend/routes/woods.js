import express from "express";
import Wood from "../models/Wood.js";

const router = express.Router();

// GET /api/woods — List all stays
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    let query = Wood.find().sort({ createdAt: -1 });

    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }

    const woods = await query;
    res.json(woods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stays", error: error.message });
  }
});

// GET /api/woods/:id — Get single stay
router.get("/:id", async (req, res) => {
  try {
    const wood = await Wood.findById(req.params.id);

    if (!wood) {
      return res.status(404).json({ message: "Stay not found" });
    }

    res.json(wood);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stay", error: error.message });
  }
});

// POST /api/woods — Create a stay
router.post("/", async (req, res) => {
  try {
    const wood = await Wood.create(req.body);
    res.status(201).json(wood);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: "Validation failed", errors: messages });
    }
    res.status(500).json({ message: "Failed to create stay", error: error.message });
  }
});

// PUT /api/woods/:id — Update a stay
router.put("/:id", async (req, res) => {
  try {
    const wood = await Wood.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!wood) {
      return res.status(404).json({ message: "Stay not found" });
    }

    res.json(wood);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: "Validation failed", errors: messages });
    }
    res.status(500).json({ message: "Failed to update stay", error: error.message });
  }
});

// DELETE /api/woods/:id — Delete a stay
router.delete("/:id", async (req, res) => {
  try {
    const wood = await Wood.findByIdAndDelete(req.params.id);

    if (!wood) {
      return res.status(404).json({ message: "Stay not found" });
    }

    res.json({ message: "Stay deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete stay", error: error.message });
  }
});

export default router;
