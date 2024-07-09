const mongoose = require("mongoose");
const TestCases = require("./TestCaseModel");
const CodeSnippet = require("./CodeSnippetModel");
const questionSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  topics: {
    type: [String],
    required: true,
  },
  companies: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  "title-slug": {
    type: String,
    required: true,
    unique: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },

  content: {
    type: String,
    required: true,
  },
  codeSnippets: {
    type: [CodeSnippet.schema],
    required: true,
  },
  testcases: {
    type: [TestCases.schema],
    required: true,
  },
});
const Problem = mongoose.model("Problem", questionSchema);
module.exports = Problem;
