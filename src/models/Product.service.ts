import { ProductInput, ProductInquery, ProductUpdateInput } from "../libs/types/product";
import ProductModel from "../schema/Product.Model";
import { Product } from "../libs/types/product";
import Errors from "../libs/Errors";
import { HTTPCODES } from "../libs/Errors";
import { MESSAGE } from "../libs/Errors";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";
import { shapeIntoMongooseObjectId } from "../libs/utils/config";
import { ObjectId } from "mongoose";

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

    public async getAllProducts(): Promise<Product []> {
   // string => objectId    
   const result = await this.productModel
   .find()
   .exec();
   if(!result) throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND);
   return result.map(doc => doc.toObject() as Product);
  }

  public async getProducts(inquery: ProductInquery): Promise<Product>{
     const match: T = {productStatus: ProductStatus.PROCESS}
      if(inquery.productCollection) 
        match.productCollection = inquery.productCollection;
      if(inquery.search){
        match.productName = {$regex: new RegExp(inquery.search, 'i')};  //searching method uchun regexp degan xossa
      }
      const sort : T = inquery.order === 'productPrice'
       ? {[inquery.order]: -1} 
       : {[inquery.order]: 1};

       const result = await this.productModel.aggregate([
          {$match: match},
          {$sort: sort},
          {$skip: (inquery.page * 1 -1) * inquery.limit},  //pagination uchun
          {$limit: inquery.limit * 1},                   //pagination uchun 
         ])
         .exec();
         if(!result) throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND);


      return result as unknown as Product;
  }

  public async getProduct(memberId: ObjectId | null, id: string): Promise<Product> {
       const productId = shapeIntoMongooseObjectId(id);
       let result = await this.productModel
            .findOne({_id: productId, productStatus: ProductStatus.PROCESS})
            .exec();
       if(!result) throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND);

      return result as unknown as Product;
    }

    public async updateChosenProduct(id: string, input: ProductUpdateInput): Promise<Product>{
        id = shapeIntoMongooseObjectId(id);
        const result = await this.productModel
        .findByIdAndUpdate({_id: id}, input, {new: true})
        .exec();
        if(!result) throw new Errors(HTTPCODES.NOT_MODIFIED, MESSAGE.UPDATE_FAILED)
            return result.toObject() as Product;
    }
}

export default ProductService;