const Problem = require("../models/ProblemModel");

exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({}).select("_id title level");
    res.status(200).json({
      problems,
    });
  } catch (error) {
    console.error("Error getting problems:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id);
    console.log(problem); 
    res.status(200).json({
      problem,
    });
  } catch (error) {
    console.error("Error getting problem:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

