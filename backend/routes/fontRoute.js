const express = require("express");
const router = express.Router();
const fontController = require("../controllers/fontController");

// Add a new font
router.post("/", fontController.addFont);

// Get all fonts
router.get("/", fontController.getFonts);

module.exports = router;
