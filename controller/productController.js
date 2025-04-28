import Product from "../models/product.js";

export async function addProduct(req, res) {
  console.log("Decoded user:", req.user);

  if (req.user == null) {
    return res.status(401).json({
      message: "Please login and try again",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(401).json({
      message: "You are not authorized to perform this task",
    });
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

export async function getProduct(req, res) {
  console.log("Decoded user", req.user);

  if (req.user == null) {
    return res.status(401).json({
      message: "Please login and try again",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(401).json({
      message: "You are not authorized to perform this task",
    });
  }

  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get products",
    });
  }
}
