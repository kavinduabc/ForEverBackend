import mongoose from "mongoose";
import express from "express";
import userRouter from "./route/userRouter.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv"
import cors from "cors";


dotenv.config();

const app = express();

app.use(cors())

app.use(bodyParser.json());

// Middleware to verify JWT
app.use((req, res, next) => {
  let token = req.header("Authentication");

  if (token) {
    token = token.replace("Bearer ", ""); // added space after 'Bearer'

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("JWT verification Failed", err.message);
      } else {
        req.user = decoded;
      }
    });
  }

  next(); // 🔧 this was missing
});

// Routing
app.use("/api/user", userRouter); // 🔧 missing '/' at start

// MongoDB connection
const mongoUrl = "mongodb+srv://abc:root@cluster0.i2xn0i4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection is successful");
});

// Start server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
