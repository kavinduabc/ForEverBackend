import mongoose from "mongoose";

const productShema = mongoose.Schema({
    image:{
        type :[string],
        required:true,
        default :["https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw0uCU9t72Sm51_RBTIJ2OxU&ust=1739456529253000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMCbiuCqvosDFQAAAAAdAAAAABAE"]
    },
    name : {
        type : String,
        required : true
    },
    discription :{
        type : String,
        required : true
    },
    category :{
        type : String,
        required : true
    },
    subCategory :{
        type : String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    size :{
        type : [String],
        required : true
    }

})

const Product = mongoose.model("product",productShema);

export default Product;