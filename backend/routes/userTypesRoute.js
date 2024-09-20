const express = require("express");
const router = express.Router();
const controller = require("../controllers/userTypeController");
const rootMiddleware = require("../middlewares/root");

router.get("/all", rootMiddleware, controller.findAll);
router.post("/", controller.create);
router.get("/:id", controller.findById);

module.exports = router;
