// index.js
import mongoose from "mongoose";
import express from "express";
import userRouter from "./route/userRouter.js";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./route/productRouter.js";

dotenv.config();

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Built-in body parser

// JWT Middleware
app.use((req, res, next) => {
  let token = req.header("Authorization");

  if (token) {
    token = token.replace("Bearer ", ""); // Fixed space after Bearer

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification failed:", err.message);
      } else {
        console.log("JWT verified:", decoded);
        req.user = decoded;
      }
    });
  }

  next();
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// MongoDB connection
const mongoUrl = "mongodb+srv://abc:root@cluster0.i2xn0i4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection is successful");
});

// Start server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
