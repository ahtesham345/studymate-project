// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const adminmiddleware = require("./middleware/admin.middleware");
const authmiddleware = require("./middleware/auth.middleware");
const authroute = require("./routes/auth");
const rolesroute = require("./routes/roles");
const userroute = require("./routes/user");
const calanderroute = require("./routes/calender");
const cors = require('cors');

const app = express();
const port = process.env.PORT;

// Use cors middleware for all routes
app.use(cors());

// Databse Connection 
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

// Middlewares
app.use(express.json());

// Route Prefix 
app.use("/auth", authroute);
app.use("/roles", rolesroute);
app.use("/users", userroute);
app.use("/calender", calanderroute);
app.get("/auth/protected", authmiddleware, (req, res) => {
  try {
    const { role, id } = req.userData;
    // Customize the response based on the user's role
    if (role === "admin") {
      return res.status(200).json({ message: "Welcome to the Admin Dashboard!" });
    } else if (role === "student") {
      return res.status(200).json({ message: "Welcome to the Student Dashboard!" });
    } else {
      return res.status(403).json({ message: "Forbidden, unknown role" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
