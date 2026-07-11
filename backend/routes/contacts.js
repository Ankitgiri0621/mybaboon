import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contacts — Save a contact form submission
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: "Message sent successfully", contact });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: "Validation failed", errors: messages });
    }
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
});

export default router;
