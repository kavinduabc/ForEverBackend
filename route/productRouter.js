import express from "express"
import { addProduct } from "../controller/productController.js";

const producRouter = express.Router();
producRouter.post("/",addProduct);

export default producRouter;