import mongoose from "mongoose";
import express from "express";


let app = express()



const mongoUrl = "mongodb+srv://abc:root@cluster0.i2xn0i4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoUrl)
let connection = mongoose.connection

connection.once("open",()=>{
    console.log("MongoDB connection is successfully")
})

app.listen(4000,()=>{
    console.log("server is running on port 4000")
})



