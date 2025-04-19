import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import userRouter from "./route/userRouter.js"
import cors from "cors"
import producRouter from "./route/productRouter.js"


dotenv.config();

let app = express()

app.use(cors());
app.use(bodyParser.json())

app.use((req,res,next)=>{
  let token = req.header("Authorization");

  if(token){
     token = token.replace("Bearer ", "");

     jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
      if(err){
        console.error("JWT Verification Failed:", err.message);
      }else {
        req.user = decoded;
      }
     })
  }
  next();
})

let mongoUrl = "mongodb+srv://admin:root@cluster0.paigr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoUrl)

let connection = mongoose.connection

connection.once("open",()=>{
  console.log("Mongo db connection successfull")
})

app.use("/api/user",userRouter);
app.use("/api/product",producRouter)

app.listen(4000,()=>{
  console.log("Server is runnig on port 4000")
})
