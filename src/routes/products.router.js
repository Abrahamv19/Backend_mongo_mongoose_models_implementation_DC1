// @ts-check
import { Router } from "express";
import express from "express"
import { ProductManager } from "../productManager.js"
import { io } from '../app.js';

export const productManager = new ProductManager('./products.json');
export const productManagerRouter = Router();

productManagerRouter.use(express.urlencoded({ extended: true }));
productManagerRouter.use(express.json());


productManagerRouter.get('/', async (req, res) => {
    try {
        const setLimit = req.query.limit;
        const products = await productManager.getProducts();
        
        if(!setLimit) {
            // return res.status(200).json({status: 'success', data: products});
            return res.render('home', {data: products});
        } else {
            const newArray = products.slice(0, setLimit);
            // return res.status(200).json({status: 'success', data: newArray});
            return res.render('home', {data: newArray});  
        }
        
    } catch (error) {
        return res.status(400).send({status: 'error', data: error.message});
    }  
});

productManagerRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const found = await productManager.getProductById(pid);
        if(found != undefined) {
            return res.status(200).json({status: 'success getProductById', data: found});
        } else {
            return res.status(400).json({status: 'error getProductById', data: {}});
        }
    } catch (error) {
        return res.status(400).send({status: 'error', data: error.message});   
    }
});

  productManagerRouter.put("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const { title, category, description, price, thumbnail, code, stock, status } = req.body;
      const updateProduct = await productManager.updateProduct(pid, title, category, description, price, thumbnail, code, stock, status);
      return res.status(200).json({status: 'success updateProduct', data: updateProduct});
    } catch (error) {
        res.status(400).send({ status: "error", data: error.message });
    }
  });

  productManagerRouter.delete("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const result = await productManager.deleteProduct(pid);
      if(result){
        const allProduct = await productManager.getProducts();
        io.emit('realTime',allProduct);
        res.status(200).json({status: `success deleteProduct Id: ${pid}`, data: allProduct});

      }else {
        res.status(404).json({status:'error deleteProduct', data:{}})
      }
    } catch (error) {
        res.status(400).send({ status: "error", data: error.message });
    }
  });

productManagerRouter.post("/", async (req, res) => {
    // const  product  = req.body;
  
    try {
        let product = req.body;
        const result = await productManager.addProduct(product);
        if(result) {
          const allProduct = await productManager.getProducts();
          // WEBSOCKET EMIT A REALTIMEPRODUCTS.HANDLEBARS
          io.emit('realTime',allProduct);
          res.status(200).json({ status: "success addProduct", data: product });
        }else {
          res.status(404).send({status:'error addProduct', msg: 'Code field cannot be repeated and fields can not be undefined, null or empty space', data:{}})}
      
    } catch (error) {
      res.status(400).send({ status: "error", data: error.message});
    }
  });



