import * as fs from 'fs'
import { ProductManager } from './productManager.js';
const productManager = new ProductManager("./products.json");

export class CartManager {

    constructor(path) {
        this.path = path;
    };

     newCart = async() => {
        try {
            let carts = []
            if (fs.existsSync(this.path)){
                const archive = await fs.promises.readFile(this.path, 'utf-8');
                carts = JSON.parse(archive);
            }
            const id = carts.length>0 ? carts[carts.length-1].id + 1 : 1;
            const newCart = {id, products:[]}
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return newCart;
        } catch (error) {
            console.log(error);
        }
    };

     getCartById = async(id) => {
      try {
        if (fs.existsSync(this.path)){
            const archive = await fs.promises.readFile(this.path, 'utf-8');
            let carts = JSON.parse(archive);
            let Found = carts.find((cart)=>cart.id === id);
            return !Found ? 'Cart not found': Found.products;
        } else {
            return 'Carts file does not exists';
        }
      } catch (error) {
          console.log(error);
      }
    };

     addProductToCart = async(cId, pId, q) => {
      try{
        let quantity= q||1;
        const archive = await fs.promises.readFile(this.path, 'utf-8');
        let carts = JSON.parse(archive);
        const cartIndex = carts.findIndex((cart)=> cart.id = cId)
        if (cartIndex === -1) {
          return 'Cart not found';
        }
        let prodInCart = carts[cartIndex].products.findIndex((prod)=>prod.id === pId)
        if(prodInCart===-1){
          const product = await productManager.getProductById(pId)
          if (!product) {
            return 'Product not found';
          }     
          const newProduct = { id: pId, quantity };
          carts[cartIndex].products.push(newProduct);
        } else {
          carts[cartIndex].products[prodInCart].quantity += quantity;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return carts[cartIndex].products.length>0 ? carts[cartIndex].products[prodInCart] : 'Empty Cart';
      } catch (error) {
         console.log(error);
      }
    };
};

