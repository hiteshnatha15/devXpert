const mongoose = require("mongoose");

const testCases = new mongoose.Schema({
  _id: Number,
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
});

const TestCases = mongoose.model("TestCases", testCases);

module.exports = TestCases;
