import mongoose from "mongoose";
import Product from "../model/product.model.js";

export const getProducts = async (req,res) => {
    try{
        const product = await Product.find({});
        res.status(200).json({success : true, data: product});

    }catch(err){
        console.log("error in fetching products:", error.message);
       res.status(404).json({success:false, message : "Product not found or Server eoor"})
    }
};

export const createProduct = async (req,res) => {
    const product = req.body;

    if(!product.name || product.price === undefined || !product.image){
        return res.status(400).json({success:false,message:"please provide all terms"})
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(200).json({success:true,message:"Product created successfuly",data:newProduct});

    }catch(err){
       console.log("Error craeting Product " + err.message);
       res.status(400).json({success:false,message:"Error craeting product"});  
    }
};

export const updateProduct = async (req,res) =>{
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"ID not found"})
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true,message:"Product Updated Successfuly",data: updatedProduct})

    }catch(err){
        console.log("Error updating product " + err.message);
        res.status(400).json({success:false, message:"Error Updating product"})
    }

};

export const deleteProduct = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"ID not found"})
    }

    try{
        const deletedProduct = await Product.findOneAndDelete(id);

        res.status(200).json({success:true,message:"Product Deleted successfuly",data:deletedProduct});


    }catch(err){
        console.log("Error Deleting product " + err.message);
        res.status(400).json({success:false,message:"Error deleting product"})
    }

};