import Product from "../models/product.js";
import express from "express"

export function addProduct(req,res){

    if( user == null){
        res.status(401).json({
            message : "Please login"
        })
    }

    if(req.user.role != "admin"){
        
    }

    const data = req.body;
}