const express = require("express");
const router = express.Router();
const controller = require("../controllers/intentController");
const auth = require("../middlewares/auth");

router.post("/", auth, controller.createIntent);

module.exports = router;
