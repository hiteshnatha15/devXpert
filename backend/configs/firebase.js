const admin = require("firebase-admin");

const connectFirebase = () => {
  const serviceAccount = require("./devxpert-coding-platform-firebase-adminsdk-nm5xx-72043c7213.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
  console.log("Firebase connected");
};
module.exports = connectFirebase;
