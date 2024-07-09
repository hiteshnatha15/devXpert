const Problem = require("../models/ProblemModel");
const { handleJavaCode } = require("../services/codeServices");

exports.submit = async (req, res) => {
  try {
    const { id, code, language } = req.body;
    const { uid } = req.user;

    // Fetch problem and test cases
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    const testcases = problem.testcases;

    if (language.toLowerCase() === "java") {
      handleJavaCode(req, res, code, testcases);
    }
  } catch (error) {
    console.error(`Internal server error: ${error}`);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
