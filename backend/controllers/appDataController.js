const AppData = require("../models/appData");
const User = require("../models/user");
const cloudinary = require("../cloudinary/cloudinary");

// Create a new AppData entry
exports.createAppData = async (req, res) => {
  try {
    const {
      title,
      splashScreenColor,
      primaryColor,
      secondaryColor,
      font,
      productEnabled,
      serviceEnabled,
      banners,
      createdBy,
      currentOwner,
    } = req.body;

    const options = {
      use_filename: false,
      unique_filename: false,
      overwrite: true,
      public_id: `${Date.now()}`,
      resource_type: "auto",
    };

    // Validate required fields
    if (
      !title ||
      !splashScreenColor ||
      !primaryColor ||
      !secondaryColor ||
      !font ||
      !createdBy ||
      !currentOwner
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    let bannerUrls = [];

    for (let i = 0; i < banners.length; i++) {
      let response = await cloudinary.uploader.upload(
        banners[i].image,
        options
      );

      bannerUrls.push({ image: response.url });
    }

    // Ensure the user exists
    const userExists = await User.findById(createdBy);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure the user exists
    const ownerExists = await User.findById(createdBy);
    if (!ownerExists) {
      return res.status(404).json({ error: "Owner not found" });
    }

    const newAppData = new AppData({
      title,
      splashScreenColor,
      primaryColor,
      secondaryColor,
      font,
      productEnabled,
      serviceEnabled,
      banners: bannerUrls,
      createdBy,
      currentOwner,
    });

    await newAppData.save();
    res
      .status(201)
      .json({ message: "AppData created successfully", data: newAppData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all AppData entries
exports.getAllAppData = async (req, res) => {
  try {
    const appData = await AppData.find().populate("shop");
    res.status(200).json(appData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single AppData entry by ID
exports.getAppDataById = async (req, res) => {
  try {
    const appData = await AppData.findById(req.params.id);
    if (!appData) {
      return res.status(404).json({ error: "AppData not found" });
    }
    res.status(200).json(appData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get AppData by OwnerId
exports.getAppDataByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const appData = await AppData.find({
      currentOwner: ownerId,
    });

    if (!appData.length) {
      return res
        .status(404)
        .json({ error: "AppData not found for the given user." });
    }
    res.status(200).json(appData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an AppData entry by ID
exports.updateAppDataById = async (req, res) => {
  try {
    const {
      title,
      logoUrl,
      primaryColor,
      secondaryColor,
      splashScreenColor,
      font,
      productEnabled,
      serviceEnabled,
      banners,
    } = req.body;
    const appData = await AppData.findById(req.params.id);

    if (!appData) {
      return res.status(404).json({ error: "AppData not found" });
    }

    let bannerUrls = [];

    if (banners) {
      const options = {
        use_filename: false,
        unique_filename: false,
        overwrite: true,
        public_id: `${Date.now()}`,
        resource_type: "auto",
      };

      for (let i = 0; i < banners.length; i++) {
        if (banners[i].index !== undefined) {
          let response = await cloudinary.uploader.upload(
            banners[i].image,
            options
          );

          bannerUrls.push({ image: response.url });
        }
      }

      appData.banners = [...appData.banners, ...bannerUrls];
    }

    if (title) appData.title = title;
    if (logoUrl) appData.logoUrl = logoUrl;
    if (splashScreenColor) appData.splashScreenColor = splashScreenColor;
    if (primaryColor) appData.primaryColor = primaryColor;
    if (secondaryColor) appData.secondaryColor = secondaryColor;
    if (font) appData.font = font;
    if (productEnabled !== undefined) appData.productEnabled = productEnabled;
    if (serviceEnabled !== undefined) appData.serviceEnabled = serviceEnabled;

    await appData.save();
    res
      .status(200)
      .json({ message: "AppData updated successfully", data: appData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete image from AppData entry by ID
exports.deleteImageFromAppDataById = async (req, res) => {
  try {
    const { bannerIndex } = req.params;
    const appData = await AppData.findById(req.params.id);

    if (!appData) {
      return res.status(404).json({ error: "AppData not found" });
    }

    const banner = appData.banners.findIndex((b) => b.id === bannerIndex);

    if (banner < 0) throw new Error("Banner not found");

    appData.banners.splice(banner, 1);
    await appData.save();

    res
      .status(200)
      .json({ message: "AppData image deleted successfully", data: appData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an AppData entry by ID
exports.deleteAppDataById = async (req, res) => {
  try {
    const appData = await AppData.findByIdAndDelete(req.params.id);
    if (!appData) {
      return res.status(404).json({ error: "AppData not found" });
    }
    res.status(200).json({ message: "AppData deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
