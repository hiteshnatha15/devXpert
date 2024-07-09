const admin = require("firebase-admin");

exports.verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    console.log(`welcome${req.user.name}`);
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send({ message: "Unauthorized" });
  }
};
