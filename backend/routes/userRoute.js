const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const adminMiddleware = require("../middlewares/admin");
const rootMiddleware = require("../middlewares/root");
const authMiddleware = require("../middlewares/auth");

router.get("/profile", authMiddleware, controller.getUserById);
router.get("/all", rootMiddleware, controller.findAll);
router.post(
  "/shop/:id",
  adminMiddleware,
  rootMiddleware,
  controller.findUsersByShop
);
router.put("/profile", authMiddleware, controller.updateUserById);

module.exports = router;
