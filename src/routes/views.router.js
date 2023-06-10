// @ts-check
import express from "express"
import { Router } from "express";
import { ProductManager } from "../productManager.js";

import { io } from "../app.js";
export const viewsRouter = Router();
const productManager = new ProductManager('./products.json');

viewsRouter.use(express.urlencoded({ extended: true }));
viewsRouter.use(express.json());

// plantilla Home Handlebars
viewsRouter.get('/', async (req,res)=>{
    const result = await productManager.getProducts();
    // res.render('home',{result, style: 'home.css'});
    res.render('home',{data:result});
});

// plantilla realTimeProducts Handlebars    
viewsRouter.get('/realtimeproducts', async (req,res)=>{
    const result = await productManager.getProducts();
    res.render('realTimeProducts',{data:result});
});