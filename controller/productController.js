import Product from "../models/product.js"

export async function addProduct(req,res) {
    
    console.log("Decoded user :",req.user);

    if(req.user == null)
    {
        res.status(401).jsoan({
            message : "Please Loging and try again"
        })
        return 
    }
    if(req.user.role != "admin")
    {
        res.status(401).jsoan({
            message :"you are not authirize preform this task"
        })
        return
    }

    const data  = req.body;
    const newProduct = new Product(data);

    try{
        await newProduct.save();
        res.json({
            message :"Product registered successfull"
        })
    }
    catch(error){
        res.status(500).json({
            error :"product registration faild"
        })
    }

}