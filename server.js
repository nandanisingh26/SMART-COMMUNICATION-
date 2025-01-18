const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Configuration for Login
const mongoUri = "mongodb://localhost:27017"; // MongoDB connection URI
const loginDbName = "user_login_data";
const loginCollectionName = "logins";
const loginClient = new MongoClient(mongoUri);

// MongoDB Configuration for Registration using Mongoose
mongoose
  .connect("mongodb://localhost:27017/user_login_data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB via Mongoose for Registration");
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Define a Schema for Registration
const registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  craftType: String,
  productImage: String,
});

// Create a Model for Registration
const Register = mongoose.model("register_logins", registerSchema);

// Default route for GET /
app.get("/", (req, res) => {
  res.send("Welcome to the Varanasi Vibes API!");
});

// API route for login data
app.post("/api/login", async (req, res) => {
  const { email, password, age, mobileNumber, location } = req.body;
  const loginTime = new Date();

  try {
    await loginClient.connect();
    const db = loginClient.db(loginDbName);
    const collection = db.collection(loginCollectionName);

    // Insert login data into MongoDB
    const loginData = { email, password, age, mobileNumber, location, loginTime };
    await collection.insertOne(loginData);

    res.status(200).json({ message: "Login data stored successfully!" });
  } catch (error) {
    console.error("Error storing login data:", error.message);
    res.status(500).json({ error: "Failed to store login data." });
  } finally {
    await loginClient.close();
  }
});

// API Route to Handle Registration
app.post("/api/register", async (req, res) => {
  const { name, email, phone, craftType, productImage } = req.body;

  try {
    const newUser = new Register({ name, email, phone, craftType, productImage });
    await newUser.save();
    res.status(201).send({ message: "Registration successful", user: newUser });
  } catch (error) {
    console.error("Error saving registration data:", error.message);
    res.status(500).send({ message: "Error saving user data", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
