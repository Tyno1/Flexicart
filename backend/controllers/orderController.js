const Order = require("../models/order");
const { sendEmail } = require("../controllers/mailSend");
const Transaction = require("../models/transaction");
const { currencyConverter } = require("../utils");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new order
// const createOrder = async (req, res) => {
//   const order = new Order({
//     shopId: req.body.shopId,
//     customerId: req.body.customerId,
//     status: req.body.status,
//     items: req.body.items,
//   });

//   try {
//     const newOrder = await order.save();
//     res.status(201).json(newOrder);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// Get all orders for a shop
const getOrdersByShopId = async (req, res) => {
  try {
    const orders = await Order.find({ shopId: req.params.shopId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific order
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }
    res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createOrder = async (data) => {
  console.log("data => ", data.lineItems.data);

  const newOrder = new Order({
    shopId: data.transaction.shopId,
    userId: data.transaction.userId,
    paymentIntentId: data.session.id,
    items: data.lineItems.data,
    subtotal: data.session.amount_subtotal / 100,
    total: data.session.amount_subtotal / 100,
    status: data.session.status,
  });
  try {
    // Update the transactions
    const transaction = Transaction.findOne({ sessionId: data.session.id });

    transaction.status = "completed";

    const savedOrder = await newOrder.save();
    const recipientEmail = data.session.customer_details.email;
    const recipientName = data.session.customer_details.email;
    const subject = "Flexikart Order Confirmation";
    const text = `Congratulations. Your Order has been successfully Processed. Find details about your order below`;
    const productsHtml = data.lineItems.data.map(
      (item) =>
        `<ul key="${item._id}">
        <li>
          <p>Name: ${item?.description}</p>
          <p>Unit Price: 
          ${currencyConverter(item?.currency)} 
          ${item?.price.unit_amount / 100}</p>
          <p>Quantity: ${item?.quantity}</p>
          <p>Price: 
          ${currencyConverter(item?.currency)} 
          ${item?.amount_subtotal / 100}</p>
        </li>
      </ul>`
    );
    const html = `<strong>Your Order has been successfully Processed</strong>
      <div>${productsHtml}</div>
      <div>Total: ${data.session.amount_subtotal / 100}</div>
      `;

    await sendEmail(recipientEmail, recipientName, subject, html, text);
  } catch (err) {
    console.log(err);
  }
};

const findByUserId = async (req, res) => {
  const { userId } = req.params;
  const shopId = req.headers["x-shop-id"]; // Extract shopId from the request headers

  try {
    // Ensure both userId and shopId are present
    if (!userId || !shopId) {
      return res.status(400).json({ error: "userId and shopId are required" });
    }

    // Find orders by userId and shopId
    const orders = await Order.find({ userId, shopId });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error finding orders", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get order item by id
module.exports.getOrderItemById = async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const item = await Order.findById(item.itemId).populate("");
    res.status(200).json(item);
  } catch (error) {
    console.error("Error finding item by itemId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//find order by orderId
module.exports.findOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId).populate("products.drugId");
    res.status(200).json(order);
  } catch (error) {
    console.error("Error finding order by orderId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an order by ID
const deleteOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.remove();
    res.status(200).json({ message: "Order successfully deleted" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  getOrdersByShopId,
  deleteOrderById,
  findByUserId,
};
