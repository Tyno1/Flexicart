const ShopUser = require("../models/shopUser");
const User = require("../models/user");
const Shop = require("../models/shop");
const UserType = require("../models/userType");

// Create a new ShopUser
exports.createShopUser = async (req, res) => {
  try {
    const { user, shop, userType } = req.body;

    // Ensure the user, shop, and user type exist
    const userExists = await User.findById(user);
    const shopExists = await Shop.findById(shop);
    const userTypeExists = await UserType.findById(userType);

    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!shopExists) {
      return res.status(404).json({ error: "Shop not found" });
    }
    if (!userTypeExists) {
      return res.status(404).json({ error: "User type not found" });
    }

    const newShopUser = new ShopUser({
      user,
      shop,
      userType,
    });

    await newShopUser.save();
    res
      .status(201)
      .json({ message: "ShopUser created successfully", data: newShopUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ShopUsers
exports.getAllShopUsers = async (req, res) => {
  try {
    const shopUsers = await ShopUser.find().populate("user shop userType");
    res.status(200).json(shopUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users for a particular shop
exports.getAllUsersForShop = async (req, res) => {
  try {
    const { shopId } = req.params;

    // Ensure the shop exists
    const shopExists = await Shop.findById(shopId);
    if (!shopExists) {
      return res.status(404).json({ error: "Shop not found" });
    }

    const shopUsers = await ShopUser.find({ shop: shopId }).populate("user userType");
    res.status(200).json(shopUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single ShopUser by ID
exports.getShopUserById = async (req, res) => {
  try {
    const shopUser = await ShopUser.findById(req.params.id).populate(
      "user shop userType"
    );
    if (!shopUser) {
      return res.status(404).json({ error: "ShopUser not found" });
    }
    res.status(200).json(shopUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a ShopUser by ID
exports.updateShopUserById = async (req, res) => {
  try {
    const { user, shop, userType } = req.body;
    const shopUser = await ShopUser.findById(req.params.id);

    if (!shopUser) {
      return res.status(404).json({ error: "ShopUser not found" });
    }

    if (user) shopUser.user = user;
    if (shop) shopUser.shop = shop;
    if (userType) shopUser.userType = userType;

    await shopUser.save();
    res
      .status(200)
      .json({ message: "ShopUser updated successfully", data: shopUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a ShopUser by ID
exports.deleteShopUserById = async (req, res) => {
  try {
    const shopUser = await ShopUser.findByIdAndDelete(req.params.id);
    if (!shopUser) {
      return res.status(404).json({ error: "ShopUser not found" });
    }
    res.status(200).json({ message: "ShopUser deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
