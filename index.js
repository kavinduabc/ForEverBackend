import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userRouter from "./route/userRouter.js";
import cors from "cors";
import productRouter from "./route/productRouter.js";

dotenv.config();

let app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// JWT Middleware to verify token
app.use((req, res, next) => {
  let token = req.header("Authorization");

  if (token) {
    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Failed:", err.message);
      } else {
        req.user = decoded;
      }
    });
  }
  next();
});

// MongoDB Connection
let mongoUrl = process.env.MONGO_URI || "mongodb+srv://admin:root@cluster0.paigr.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl);

let connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB connection successful");
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
