const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const { submit } = require("../controllers/submissionController");

router.post("/execute", verifyToken, submit);

module.exports = router;
