require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./middlewares/auth");
const appDataRoutes = require("./routes/appDataRoute");
const authRoutes = require("./routes/authRoute");
const cartRoutes = require("./routes/cartRoute");
const productRoutes = require("./routes/productRoute");
const serviceRoutes = require("./routes/serviceRoute");
const shopRoutes = require("./routes/shopRoute");
const shopUserRoutes = require("./routes/shopUserRoute");
const userRoutes = require("./routes/userRoute");
const userTypesRoutes = require("./routes/userTypesRoute");
const fontRoutes = require("./routes/fontRoute");
const categoryRoutes = require("./routes/categoryRoute");
const intentRoutes = require("./routes/intentRoute");
const webhookRoutes = require("./routes/webhookRoute");
const reviewRoutes = require("./routes/reviewRoute");
const transactionRoutes = require("./routes/transactionRoute");
const orderRoutes = require("./routes/order");

const cloudinary = require("../backend/cloudinary/cloudinary");

const app = express();
const uri =
  "mongodb://tynoukus:CQjStIt2pea0z3nR@ac-ljrgroy-shard-00-00.d0giekr.mongodb.net:27017,ac-ljrgroy-shard-00-01.d0giekr.mongodb.net:27017,ac-ljrgroy-shard-00-02.d0giekr.mongodb.net:27017/?replicaSet=atlas-7nnfhd-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=FlexiCart";

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/app-data", appDataRoutes);
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);
app.use("/services", serviceRoutes);
app.use("/shops", shopRoutes);
app.use("/shop-users", shopUserRoutes);
app.use("/services", serviceRoutes);
app.use("/users", userRoutes);
app.use("/user-types", userTypesRoutes);
app.use("/fonts", fontRoutes);
app.use("/categories", categoryRoutes);
app.use("/intents", intentRoutes);
app.use("/webhooks", webhookRoutes);
app.use("/reviews", reviewRoutes);
app.use("/transactions", transactionRoutes);
app.use("/orders", orderRoutes);
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
