import { Product, ProductInquery } from './../libs/types/product';
import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import Errors, { HTTPCODES, MESSAGE } from '../libs/Errors';
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";
import ProductService from '../models/Product.service';
import { ProductCollection } from '../libs/enums/product.enum';


const productService = new ProductService()
const productController: T = {};

productController.createNewProduct = async (req: AdminRequest, res: Response) => {
    try {
        console.log('Create Products controller')
        if(!req.files?.length)
            throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED)

        const data: ProductInput = req.body;
        data.productImages = req.files?.map((ele) => {
            return ele.path.replace(/\\/g, "/" );
        })
        await productService.createNewProduct(data)
        res.send(data)

    } catch (err) {
        console.log('Error on create product controller', err);
        throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED)
    }
};

productController.updateChosenProducts = async (req: Request, res: Response) => {
    try {
        console.log('update chosen products');
        const id = req.params.id;
        const result = await productService.updateChosenProduct(id, req.body);
        res.status(HTTPCODES.OK).json({data: result})
    } catch (err) {
        console.log('Error updateChosenProduct controller', err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}


    productController.getAllProducts = async (req: Request, res: Response) =>{
        try {
            console.log('getAllProducts controller');
            const data =  await productService.getAllProducts();
            // res.render('products', {products: data})
            res.send(data)
        } catch (err) {
          console.log( "ERROR getAllProducts productController", err); 
          if(err instanceof Errors) res.status(err.code).json(err);
          else res.status(Errors.standart.code).json(Errors.standart); 
        }

    }

    productController.getProducts =async (req: Request, res: Response) => {
        try{
        console.log("getProducts");
        const {page, limit, order, productCollection, search} = req.query;
        const inquery: ProductInquery = {
            order: String(order),
            page: Number(page),
            limit: Number(limit),
        };

         if(productCollection) {
             inquery.productCollection = productCollection as ProductCollection;
         }
           
         if(search){inquery.search = String(search)} 
            
         const result = await productService.getProducts(inquery)
        
        res.status(HTTPCODES.OK).json(result)

    } catch(err){
        console.log( "Error getProducts productController", err); 
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart); 
    }
    }


    productController.getProduct = async(req: ExtendedRequest, res: Response) => {
   try {
       console.log('getPorduct')
       const { id } =  req.params;
       const memberId = req.member?._id ?? null,
       result = await productService.getProduct(memberId, id);

       res.status(200).json(result)
   } catch (err) {
     console.log('Error, getProduct:', err);
     if(err instanceof Errors) res.status(err.code).json(err);
     else res.status(Errors.standart.code).json(Errors.standart)
   }
}


export default productController;