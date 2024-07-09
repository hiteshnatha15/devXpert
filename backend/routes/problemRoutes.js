const express = require("express");
const router = express.Router();
const {
  getProblems,
  getProblem,
  runCode,
} = require("../controllers/problemController");
const { verifyToken } = require("../middlewares/auth");

router.get("/practice", verifyToken, getProblems);
router.get("/problem/:id", verifyToken, getProblem);
module.exports = router;
