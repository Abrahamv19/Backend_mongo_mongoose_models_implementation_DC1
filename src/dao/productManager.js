import * as fs from 'fs'

export class ProductManager {

    constructor(path) {
        this.path = path;  
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const archive = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(archive)
             
                return products;
            } else {
                const products = await fs.promises.writeFile(this.path, "[]");
             
                return products;
            };
              
        } catch (error) {
            console.log(error);
        };
    };

    getProductByCode(code) {
        const archive = fs.readFileSync(this.path, "utf-8");
        const products = JSON.parse(archive)
       
        const existsInArray = products.find(prod => prod.code === code);
        if(existsInArray) {
            return true;
        } else {
            return false;
        }
    }

    
    generateId() {
        const archive = fs.readFile(this.path, "utf-8");
        const products = JSON.parse(archive)
        let maxId = 0;
        for(let i = 0; i < products.length; i++) {
            const prod = products[i];
            if(prod.id > maxId) {
                maxId = prod.id;
            }
        }
        return ++maxId;
    }

    
    addProduct = async(product) => {
        
        try {
            const value =  this.getProductByCode(product.code);
            const archive = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(archive);

            if((product.title === undefined || product.title === null || product.title === '') || (product.description === undefined || product.description === null || product.description === '') || (product.price === undefined || product.price === null || product.price === '') || (product.thumbnail === undefined || product.thumbnail === null || product.thumbnail === '') || (product.code === undefined || product.code === null || product.code === '' || value === true) || (product.stock === undefined || product.stock === null || product.stock === '') || (product.status === undefined || product.status === null || product.status === '')) {
                console.log('Error!!, Code field cannot be repeated and fields can not be undefined, null or empty space'); 
                return false;

            }else {
                let maxId = 0;
                for(let i = 0; i < products.length; i++) {
                    const prod = products[i];
                    if(prod.id > maxId) {
                        maxId = prod.id;
                    }
                }
                ++maxId;

                product.id=maxId
                products.push(product);
    
                const dataJSON=JSON.stringify(products)
                await fs.promises.writeFile(this.path, dataJSON)
                return product; 
            }


        } catch (error) {
            console.log(error); 
        }
    }
    
    getProductById = async (id) => {
        try {
            const archive = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(archive);

            const found = products.find(prod => prod.id == id);
            if(found) {
                console.log(found); 
                return found;
                  
            } else {
                console.log('Not found');
                return undefined;
            }

            
        } catch (error) {
            console.log(error); 
        }
    }

    deleteProduct = async (id) => {
        try {
          const readData = await fs.promises.readFile(this.path,"utf-8" );
          const newData = JSON.parse(readData);
          const product = newData.find((product) => product.id == id);
          if (!product) {
            console.log("Product not found");
            return false;
          } else {
            const filteredData = newData.filter((prod) => prod.id != id);
            const dataJSON = JSON.stringify(filteredData);
            await fs.promises.writeFile(this.path, dataJSON);
    
            console.log("Deleted product successfully");
            return true;
          }
        } catch (error) {
            console.log(error); 
        }
      };


    updateProduct = async (id, title, category, description, price, thumbnail, code, stock, status) => {
        try {
            const products = await this.getProducts();
            const item = products.find((prod) => prod.id == Number(id));
            if (item) {
                if(title){
                    item.title = title;
                }else {
                    item.title = item.title;
                }
                if(category){
                    item.category = category;
                }else {
                    item.category = item.category;
                }
                if(description){
                    item.description = description;
                }else {
                    item.description = item.description;
                }
                if(price){
                    item.price = price;
                }else {
                    item.price = item.price;
                }
                if(thumbnail){
                    item.thumbnail = thumbnail;
                }else {
                    item.thumbnail = item.thumbnail;
                }
                if(code){
                    item.code = item.code;
                }else {
                    item.code = item.code;
                }
                if(stock){
                    item.stock = stock;
                }else {
                    item.stock = item.stock;
                }
                if(status){
                    item.status = status;
                }else {
                    item.status = item.status;
                }
                const dataJSON = JSON.stringify(products)
                await fs.promises.writeFile( this.path, dataJSON )
                return item;
            } else {
                return { error: "Product Not found by Id" };
            }
        } catch (error) {
            console.log(error); 
        }
    };
}



