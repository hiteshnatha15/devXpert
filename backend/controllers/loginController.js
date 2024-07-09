const User = require("../models/UserModel");

exports.signupController = async (req, res) => {
  const { uid, email, name } = req.user;
  console.log("Received user data:", req.user);

  try {
    // Check if user already exists
    let user = await User.findOne({ uid });
    if (!user) {
      // Create a new user
      user = new User({ uid, email, name });
      await user.save();
    }

    res.status(200).send({ message: "User authenticated successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
