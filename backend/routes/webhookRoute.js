const express = require("express");
const router = express.Router();
const controller = require("../controllers/webhookController");

// router.post(
//   "/",
//   express.raw({ type: "application/json" }),
//   controller.confirmEvent
// );
router.get("/confirm-payment", controller.paymentConfirmation);

router.get("/payment-failure", controller.paymentFailed);

module.exports = router;
