const express = require("express");
const router = express.Router();
const { signupController } = require("../controllers/loginController");
const { verifyToken } = require("../middlewares/auth");

router.post("/google", verifyToken, signupController);
module.exports = router;
