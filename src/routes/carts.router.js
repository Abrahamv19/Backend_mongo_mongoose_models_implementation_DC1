// @ts-check
import { Router } from "express";
import express from 'express';
import { CartManager } from '../cartManager.js';

const cartManager = new CartManager("./carts.json");
export const cartsRouter = Router();

cartsRouter.use(express.urlencoded({ extended: true }));
cartsRouter.use(express.json());

cartsRouter.post("/", async (req, res)=>{
    try{
        const newCart = await cartManager.newCart();
        if(typeof newCart == "object"){
            return res.status(200).json({status: 'success', data: newCart});
        } else {

            return res.status(400).json({status: 'Not Cart Created', data: {}});
        }
    } catch (error) {
        return res.status(400).send({status: 'error', data: error.message});  
    }
});

cartsRouter.get("/:cid", async (req, res)=>{
    try{
        const { cid } = req.params;
        const getCartByIdResult = await cartManager.getCartById(cid);
        if(typeof getCartByIdResult == "object"){
            return res.status(200).json({status: 'success', data: getCartByIdResult});
        } else {
            return res.status(404).json({status: 'Not Cart Find it', data: {}});
        }
    } catch (error) {
        return res.status(400).send({status: 'error', data: error.message}); 
    }
});

cartsRouter.post("/:cid/products/:pid", async (req, res)=>{
    try{
        const { cid } = req.params;
        const { pid } = req.params;
        const addProductToCartResult = await cartManager.addProductToCart(cid, pid);
        if (typeof addProductToCartResult == "object"){
            return res.status(200).json({status: 'success', data: addProductToCartResult});
        } else {
            return res.status(404).json({status: 'Not added Product', data: {}});
        }
    } catch (error) {
        return res.status(400).send({status: 'error', data: error.message}); 
    }
});