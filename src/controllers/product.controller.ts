import { Product } from './../libs/types/product';
import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import Errors, { HTTPCODES, MESSAGE } from '../libs/Errors';
import { AdminRequest } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";
import ProductService from '../models/Product.service';


const productService = new ProductService()
const productController: T = {};

productController.createNewProduct = async (req: AdminRequest, res: Response) => {
    try {
        console.log('Create Products controller')
        console.log("req.body:", req.body);
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



export default productController