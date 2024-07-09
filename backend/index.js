const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 4500;
const loginRoutes = require("./routes/loginRoutes");
const connectDB = require("./configs/database");
const connectFirebase = require("./configs/firebase");
const dashboardRoutes = require("./routes/dashboardRoutes");
const problemRoutes = require("./routes/problemRoutes");
const submissionRoute = require("./routes/submissionRoute");
const { exec } = require("child_process");

connectDB();
connectFirebase();
app.use(express.json());
app.use(cors());
app.use("/api/auth", loginRoutes);
app.use(dashboardRoutes);
app.use(problemRoutes);
app.use(submissionRoute);
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error
  res.status(500).send('Something broke!'); // Send a generic error response
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
