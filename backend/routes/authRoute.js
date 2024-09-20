const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.get("/verify-registration", controller.verifyRegister);
router.post("/admin-login", controller.adminLogin);
router.post("/admin-register", controller.adminRegister);
router.post("/:shopId/signup", controller.registerToShop);
router.post("/:shopId/login", controller.loginToShop);
router.post("/refresh-token", controller.refreshToken);

module.exports = router;
