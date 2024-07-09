exports.dashboardDetails = async (req, res) => {
  try {
    const { name, email } = req.user;
    res.status(200).json({
      "name": name,
      "email": email,
    });
  } catch (error) {
    console.error("Error getting dashboard details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
