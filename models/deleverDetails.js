import mongoose, { model } from "mongoose";


const DeleverSchema = mongoose.Schema({
    firstName :{
        type:String,
        required : true
    },
    lastName :{
        type:String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    street : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    zipCode : {
        type : Number,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    }

}) 

const Delever = mongoose.model("Delivery",DeleverSchema)

export default Delever;