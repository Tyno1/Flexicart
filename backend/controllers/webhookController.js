const Transaction = require("../models/transaction");
const { createOrder } = require("./orderController");

const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports.paymentConfirmation = async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).send("Session ID is missing");
  }

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    //cs_test_b1wO4quEJA7PLYRvXE3cn2FykCOZC1G6kmreTdxvKjzn6x0BiS292vxxsg
    const transaction = await Transaction.findOne({ sessionId: session.id });

    console.log("Transaction => ", transaction);

    // Retrieve the line items for the session
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    // console.log("Session:", session);
    console.log("Line Items:", lineItems);

    // Handle payment success (e.g., update database, send confirmation email, etc.)
    if (session.status === "complete") {
      // Assuming createOrder is a function that handles order creation
      const orderData = {
        transaction,
        session,
        lineItems, // Pass the line items to createOrder for further processing
      };
      createOrder(orderData);

      // Redirect the user to the frontend application with the payment status
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment?status=success&session_id=${sessionId}`
      );
    }

    // Update Transactions with failed response

    if (transaction) {
      transaction.status = "failed";

      transaction.save();
    }

    return res.redirect(`${process.env.FRONTEND_URL}/payment?status=error`);

    // console.log(session);
  } catch (error) {
    console.error("Error retrieving session:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/payment?status=error`);
  }
};

module.exports.paymentFailed = async (req, res) => {
  try {
    // Redirect the user to the frontend application with the payment status
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment?status=failed&session_id=${sessionId}`
    );
    // console.log(session);
  } catch (error) {
    console.error("Error retrieving session:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/payment?status=error`);
  }
};
