import Product from "../models/product.js";

export async function addProduct(req, res) {
  console.log("Decoded user:", req.user);

  if (req.user == null) {
    res.status(401).json({
      message: "Please login and try again",
    });
    return;
  }

  if (req.user.role !== "admin") {
    res.status(401).json({
      message: "You are not authorized to perform this task",
    });
    return;
  }

  const data = req.body;
  const newProduct = new Product(data);

  try {
    await newProduct.save();
    res.json({
      message: "Product registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Product registration failed",
    });
  }
}

export async function  getProduct(req,res){
    
    console.log("Decoded user",req.user);

    if(req.user == null){
        res.status(401).json({
            message:"please login and try again"
        })
    }
    if(req.user.role != "admin"){
        res.status(401).json({
            message : "you are not autorized to perform this task"
        })
    }
    else{
        try {

            const products =await Product.find()
            res.json(products);
            return ;
            
        } catch (error) {
            res.status(500).json({
                message : "faild to get product"
            })
        }
    }
}
