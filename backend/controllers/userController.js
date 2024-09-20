const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserType = require("../models/userType");
const ShopUser = require("../models/shopUser");
const { imageUploader } = require("../utils");

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) throw new Error("User not found");

    const newUser = {
      username: user.username,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isVerified: user.isVerified,
      userType: user.userType,
      _id: user.id,
      address: user.address,
      imageUrl: user.imageUrl,
    };

    res.status(200).json({ data: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) throw new Error("User not found");

    if (req.body?.username) user.username = req.body.username;
    if (req.body?.firstName) user.firstName = req.body.firstName;
    if (req.body?.lastName) user.lastName = req.body.lastName;
    if (req.body?.email) user.email = req.body.email;
    if (req.body?.phone) user.phone = req.body.phone;
    // if (req.body?.imageUrl) user.imageUrl = req.body.imageUrl;
    if (req.body?.address) user.address = req.body.address;

    console.log(req.body);

    const response = await imageUploader(user, req.body.imageUrl, "imageUrl")
    console.log(response);

    await response.save();

    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read all users in a shop
module.exports.findUsersByShop = async (req, res, next) => {
  try {
    const users = await ShopUser.find({ shop: req.params.shopId });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read all users
module.exports.findAll = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
