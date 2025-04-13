import Product from "../models/product.js";

export function addProduct(req, res) {
  console.log("addProduct hit");
  console.log("req.user:", req.user); // Debug print

  if (!req.user) {
    return res.status(401).json({ message: "Please login" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "You are not authorized to perform this task" });
  }

  const data = req.body;
  const newProduct = new Product(data);
  
  newProduct.save()
    .then(() => {
      res.json({ message: "Product added successfully" });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: "Product addition failed" });
    });
}
