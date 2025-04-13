import Product from "../models/product.js";


export function addProduct(req,res){

    console.log("addProduct hit");
    
    if( req.user == null){
        res.status(401).json({
            message : "Please login"
        })
        return
    }

    if(req.user.role != "admin"){
        res.status(401).json({
           message : "you are not perform to this task"
        })
        return
    }

    const data = req.body;
    const newProduct = new Product(data);
    newProduct.save().then(()=>{
        res.json({
            message : "product added successfully"
        })
    }).catch((e)=>{
        console.log(e)
        res.status(500).json({
            
            message : "product added faild",
            
        })
    })

}