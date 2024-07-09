const mongoose = require("mongoose");

const codeSnippetSchema = new mongoose.Schema({
  lang: {
    type: String,
    required: true,
  },
  langSlug: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});
CodeSnippet = mongoose.model("CodeSnippet", codeSnippetSchema);
module.exports = CodeSnippet;
