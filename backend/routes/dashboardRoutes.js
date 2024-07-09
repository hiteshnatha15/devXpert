const express = require("express");
const router = express.Router();

const { dashboardDetails } = require("../controllers/dashboardController");
const { verifyToken } = require("../middlewares/auth");
router.get("/dashboard", verifyToken, dashboardDetails);

module.exports = router;
