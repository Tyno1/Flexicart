const Service = require("../models/service");
const Shop = require("../models/shop");
const cloudinary = require("../cloudinary/cloudinary");
const Reviews = require("../models/review");
const mongoose = require("mongoose");

// Create a new Service
exports.createService = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      duration,
      category,
      shop,
      metaData,
      imageUrls,
    } = req.body;

    // Ensure the shop exists
    const shopExists = await Shop.findById(shop);
    if (!shopExists) {
      return res.status(404).json({ error: "Shop not found" });
    }

    const options = {
      use_filename: false,
      unique_filename: false,
      overwrite: true,
      public_id: `${Date.now()}`,
      resource_type: "auto",
    };

    let images = [];

    for (let i = 0; i < imageUrls?.length; i++) {
      let response = await cloudinary.uploader.upload(
        imageUrls[i].image,
        options
      );

      images.push({ image: response.url });
    }

    const newService = new Service({
      name,
      description,
      price,
      duration,
      category,
      shop,
      metaData,
      imageUrls: images,
    });

    await newService.save();
    res
      .status(201)
      .json({ message: "Service created successfully", data: newService });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getServicesByStoreId = async (req, res) => {
  const { storeId } = req.params;
  try {
    const services = await Service.find({ shop: storeId })
      .populate("shop")
      .populate("category");
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getServicesByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const services = await Service.find({ category: categoryId })
      .populate("shop")
      .populate("category");
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("shop").populate("category");
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single Service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate("shop")
      .populate("category");
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getServiceAverageRating = async (req, res) => {
  try {
    const serviceId = req.params.id;

    // Validate if the service ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ error: "Invalid Service ID" });
    }

    const theService = await Service.findById(serviceId);
    if (!theService) {
      return res.status(404).json({ error: "Service not found" });
    }

    const reviews = await Reviews.find({ service: theService._id });

    let averageRating = 0;

    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (accum, review) => accum + (Number(review?.rating) || 0),
        0
      );
      averageRating = totalRating / reviews.length;
    }
    let response = { ...theService._doc, rating: averageRating };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a Service by ID
exports.updateServiceById = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      imageUrls,
      duration,
      metaData,
    } = req.body;
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    let images = [];
    const options = {
      use_filename: false,
      unique_filename: false,
      overwrite: true,
      public_id: `${Date.now()}`,
      resource_type: "auto",
    };

    if (imageUrls) {
      for (let i = 0; i < imageUrls?.length; i++) {
        if (imageUrls[i].image.startsWith("data")) {
          let response = await cloudinary.uploader.upload(
            imageUrls[i].image,
            options
          );

          images.push({ image: response.url });
        }
      }

      service.imageUrls = images;
    }

    if (name) service.name = name;
    if (description) service.description = description;
    if (price) service.price = price;
    if (duration) service.duration = duration;
    if (category) service.category = category;
    if (metaData) service.metaData = metaData;

    await service.save();
    res
      .status(200)
      .json({ message: "Service updated successfully", data: service });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get services by name
exports.getServiceByName = async (req, res) => {
  try {
    const { name } = req.query;
    const shopId = req.headers["x-shop-id"];

    if (!shopId) {
      return res.status(400).json({ message: "Shop ID is required" });
    }

    const services = await Service.find({
      name: { $regex: name, $options: "i" },
      shop: shopId,
    })
      .populate("category")
      .populate("shop");

    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Service by ID
exports.deleteServiceById = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
