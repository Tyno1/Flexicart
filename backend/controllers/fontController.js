const Font = require("../models/font");

// Add a new font
exports.addFont = async (req, res) => {
  try {
    const { name, fallback, meta } = req.body;

    if (!name || !fallback) {
      return res
        .status(400)
        .json({ message: "Name and fallback are required" });
    }

    const existingFont = await Font.findOne({ name });
    if (existingFont) {
      return res.status(400).json({ message: "Font already exists" });
    }

    const newFont = new Font({
      name,
      fallback,
      meta,
    });

    const savedFont = await newFont.save();
    res.status(201).json({
      message: "Font added successfully",
      font: savedFont,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all fonts
exports.getFonts = async (req, res) => {
  try {
    const fonts = await Font.find();
    res.status(200).json(fonts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
