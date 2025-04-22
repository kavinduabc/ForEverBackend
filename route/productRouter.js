import express from "express"
import { addProduct, getProduct } from "../controller/productController.js";

const producRouter = express.Router();
producRouter.post("/",addProduct);
producRouter.get("/",getProduct)
export default producRouter;