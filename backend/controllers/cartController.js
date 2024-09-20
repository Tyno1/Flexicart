const Cart = require("../models/cart");
const Product = require("../models/product");
const Service = require("../models/service");
const Shop = require("../models/shop");
const User = require("../models/user");

// Create a new Cart
exports.createCart = async (req, res) => {
  try {
    const { userId, products, services, shop } = req.body;

    // Ensure the user and shop exist
    const userExists = await User.findById(userId);
    const shopExists = await Shop.findById(shop);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!shopExists) {
      return res.status(404).json({ error: "Shop not found" });
    }

    const newCart = new Cart({
      userId,
      products,
      services,
      shop,
      status: "PENDING",
    });

    await newCart.save();
    res
      .status(201)
      .json({ message: "Cart created successfully", data: newCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Carts
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate(
      "userId shop products.productId services.serviceId"
    );
    res.status(200).json(carts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single Cart by ID
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      id: req.params.id,
      status: "PENDING",
    }).populate("userId shop products.productId services.serviceId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a cart by user ID
exports.getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId,
      shop: req.headers["x-shop-id"],
      status: "PENDING",
    }).populate("userId shop products.productId services.serviceId");

    console.log(cart);

    if (!cart) {
      const userExists = await User.findById(req.params.userId);
      const shopExists = await Shop.findById(req.headers["x-shop-id"]);
      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }
      if (!shopExists) {
        return res.status(404).json({ error: "Shop not found" });
      }

      const newCart = new Cart({
        userId: req.params.userId,
        products: [],
        services: [],
        shop: req.headers["x-shop-id"],
        status: "PENDING",
      });

      await newCart.save();
      return res
        .status(200)
        .json({ message: "New cart created", data: newCart });
    }
    res.status(200).json({ data: cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a Cart by ID
exports.updateCartById = async (req, res) => {
  try {
    const { product, service } = req.body;
    const cartId = req.params.id;
    const shopId = req.headers["x-shop-id"];

    const cart = await Cart.findOne({
      _id: cartId,
      shop: shopId,
      status: "PENDING",
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (product) {
      const productExists = cart.products.find(
        (p) => p.productId == product.productId
      );
      const productIndex = cart.products.findIndex(
        (p) => p.productId == product.productId
      );

      if (productExists) {
        productExists.quantity = product.quantity;
        cart.products[productIndex] = productExists;
      } else cart.products = [...cart.products, product];
      console.log(cart.products);
    }
    if (service) {
      const serviceExists = cart.services.find(
        (p) => p.serviceId == service.serviceId
      );
      const serviceIndex = cart.services.findIndex(
        (p) => p.serviceId == service.serviceId
      );

      if (serviceExists) {
        serviceExists.quantity = service.quantity;
        cart.services[serviceIndex] = serviceExists;
      } else cart.services = [...cart.services, service];
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully", data: cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeCartItemtById = async (req, res) => {
  try {
    const { product, service } = req.body;
    const cartId = req.params.id;
    const shopId = req.headers["x-shop-id"];

    // Find the cart
    const cart = await Cart.findOne({
      _id: cartId,
      shop: shopId,
      status: "PENDING",
    });

    // If cart not found, return 404
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Update or remove product
    if (product) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId == product.productId
      );

      if (productIndex !== -1) {
        if (product.quantity > 0) {
          cart.products[productIndex] = {
            ...cart.products[productIndex],
            quantity: product.quantity,
          };
        } else {
          // Remove the product if quantity is 0
          cart.products.splice(productIndex, 1);
        }
      } else if (product.quantity > 0) {
        // Add the product if it does not exist and quantity is greater than 0
        cart.products.push(product);
      }
    }

    // Update or remove service
    if (service) {
      const serviceIndex = cart.services.findIndex(
        (s) => s.serviceId == service.serviceId
      );

      if (serviceIndex !== -1) {
        if (service.quantity > 0) {
          cart.services[serviceIndex] = {
            ...cart.services[serviceIndex],
            quantity: service.quantity,
          };
        } else {
          // Remove the service if quantity is 0
          cart.services.splice(serviceIndex, 1);
        }
      } else if (service.quantity > 0) {
        // Add the service if it does not exist and quantity is greater than 0
        cart.services.push(service);
      }
    }

    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: "Cart updated successfully", data: cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Cart by ID
exports.deleteCartById = async (req, res) => {
  try {
    const cartId = req.params.id;
    const shopId = req.headers["x-shop-id"];

    // Find and delete the cart
    const cart = await Cart.findOneAndDelete({
      _id: cartId,
      shop: shopId,
      status: "PENDING",
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
