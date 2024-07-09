const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  uid: String,
  problemId: mongoose.Schema.Types.ObjectId,
  code: String,
  language: String,
  result: {
    status: String,
    output: String,
    error: String,
    runtime: Number,
  },
  createdAt: { type: Date, default: Date.now },
});
const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
