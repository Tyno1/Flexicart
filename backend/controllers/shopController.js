const Shop = require("../models/shop");
const User = require("../models/user");
const cloudinary = require("../cloudinary/cloudinary");

// Create a new Shop
exports.createShop = async (req, res) => {
  try {
    const { name, logo, address, storeType, storeDescription, owner } =
      req.body;

    // Validate required fields
    if (!name || !address || !storeType || !storeDescription || !owner) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // Ensure the owner exists
    const ownerExists = await User.findById(owner);
    if (!ownerExists) {
      return res.status(404).json({ error: "Owner not found" });
    }

    const options = {
      use_filename: false,
      unique_filename: false,
      overwrite: true,
      public_id: `${Date.now()}`,
      resource_type: "auto",
    };

    let response;

    if (logo) {
      response = await cloudinary.uploader.upload(logo, options);
    }

    const shopDetails = {
      name,
      address,
      storeType,
      storeDescription,
      owner,
    };

    if (response) {
      shopDetails.logo = response.url;
    }

    const newShop = new Shop({
      shopDetails,
    });

    await newShop.save();
    res
      .status(201)
      .json({ message: "Shop created successfully", data: newShop });
  } catch (error) {
    res.status(400).json(console.log(error));
  }
};

// Update existing Shop details
exports.updateShopDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logo, address, storeType, storeDescription, owner } =
      req.body;

    // Validate required fields
    if (!name || !address || !storeType || !storeDescription || !owner) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // Ensure the owner exists
    const ownerExists = await User.findById(owner);
    if (!ownerExists) {
      return res.status(404).json({ error: "Owner not found" });
    }

    // Find the shop by ID
    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    const options = {
      use_filename: false,
      unique_filename: false,
      overwrite: true,
      public_id: `${Date.now()}`,
      resource_type: "auto",
    };

    let response;

    if (logo) {
      response = await cloudinary.uploader.upload(logo, options);
    }

    shop.shopDetails = {
      name,
      address,
      storeType,
      storeDescription,
      owner,
    };

    if (response) shop.shopDetails.logo = response.url;

    await shop.save();
    res.status(200).json({ message: "Shop updated successfully", data: shop });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateShopWithNewShopUI = async (req, res) => {
  try {
    const { id } = req.params;
    const { shopUI } = req.body; // Where appData enters

    // Validate required fields
    if (!shopUI) {
      return res
        .status(400)
        .json({ message: "Add data fieled must be selected." });
    }

    // Find the shop by ID
    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    shop.shopUI = shopUI;

    await shop.save();
    res.status(200).json({ message: "Shop updated successfully", data: shop });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Shops
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get Shop by owner ID
exports.getShopByOwnerId = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      "shopDetails.owner": req.params.ownerId,
    }).populate("shopDetails.owner");
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single Shop by ID
exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Shop by ID
exports.deleteShopById = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }
    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
