const Product = require("../models/product");
const cloudinary = require("../cloudinary/cloudinary");
const Reviews = require("../models/review");
const mongoose = require("mongoose");

// Create a new Product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock,
      imageUrls,
      shop,
      metaData,
    } = req.body;

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

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrls: images,
      shop,
      metaData,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category").populate("shop");
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProductsByStoreId = async (req, res) => {
  const { storeId } = req.params;
  try {
    const products = await Product.find({ shop: storeId })
      .populate("shop")
      .populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.find({ category: categoryId })
      .populate("shop")
      .populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("shop");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProductAverageRating = async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid Product ID" });
    }

    const theProduct = await Product.findById(productId);
    if (!theProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    const reviews = await Reviews.find({ product: theProduct._id });

    console.log(reviews);
    let averageRating = 0;

    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (accum, review) => accum + (Number(review?.rating) || 0),
        0
      );
      averageRating = totalRating / reviews.length;
    }
    let response = { ...theProduct._doc, rating: averageRating };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a Product by ID
exports.updateProductById = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrls, metaData } =
      req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
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

      product.imageUrls = images;
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (metaData) product.metaData = metaData;

    await product.save();
    res
      .status(200)
      .json({ message: "Product updated successfully", data: product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get product by name
exports.getProductByName = async (req, res) => {
  try {
    const { name } = req.query;
    const shopId = req.headers["x-shop-id"];

    if (!shopId) {
      return res.status(400).json({ message: "Shop ID is required" });
    }

    const products = await Product.find({
      name: { $regex: name, $options: "i" },
      shop: shopId,
    })
      .populate("category")
      .populate("shop");

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
