const { default: mongoose } = require("mongoose");
const Transaction = require("../models/transaction");
const Cart = require("../models/cart");

const stripe = require("stripe")(process.env.STRIPE_KEY);

const calculateOrderAmount = (items) => {
  return 1400;
};

module.exports.createIntent = async (req, res) => {
  try {
    const { products, services, shop, _id: cartId } = req.body;

    console.log("services => ", services);
    console.log("products => ", products);
    console.log("Body => ", req.user);

    const productItems = products.map((product) => {
      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: product.productId.name,
          },
          unit_amount: product.productId.price * 100,
        },
        quantity: product.quantity,
      };
    });

    const serviceItems = services.map((service) => {
      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: service.serviceId.name,
          },
          unit_amount: service.serviceId.price * 100,
        },
        quantity: service.quantity,
      };
    });

    // Add order is added before sending to stripe

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [...productItems, ...serviceItems],
      success_url: `${process.env.BACKEND_URL}/webhooks/confirm-payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BACKEND_URL}/webhooks/payment-failure?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log("Intent => ", paymentIntent);
    const cart = await Cart.findOne({ _id: cartId });

    cart.status = "COMPLETED";
    await cart.save();

    // Add transaction
    const id = new mongoose.Types.ObjectId();

    const transaction = new Transaction({
      id,
      sessionId: paymentIntent.id,
      transactionId: `flexi-${id}`,
      userId: req.user.userId,
      shopId: shop._id,
      amount: paymentIntent.amount_total,
      status: "pending",
      paymentMethod: paymentIntent.payment_method_types[0],
      items: [
        ...products.map((product) => ({
          name: product?.productId?.name,
          type: "product",
          quantity: product.quantity,
          price: product?.productId?.price,
        })),
        ...services.map((service) => ({
          name: service?.serviceId?.name,
          type: "service",
          quantity: service?.serviceId?.duration,
          price: service?.serviceId?.price,
        })),
      ],
    });

    transaction.save();

    const response = {
      session: { url: paymentIntent.url },
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error.message ?? "Internal Server Error" });
  }
};
