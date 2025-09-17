import { ProductInput } from "../libs/types/product";
import ProductModel from "../schema/Product.Model";
import { Product } from "../libs/types/product";
import Errors from "../libs/Errors";
import { HTTPCODES } from "../libs/Errors";
import { MESSAGE } from "../libs/Errors";

class ProductService{
    private readonly productModel;

    constructor(){
        this.productModel = ProductModel
    }

    public async createNewProduct(input: ProductInput): Promise<Product>{
        try {
            const result = await this.productModel.create(input)
            return result.toObject() as Product; 
        } catch (err) {
            console.log('Error on create product', err)
            throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED);
        }
        
    }
}

export default ProductService;