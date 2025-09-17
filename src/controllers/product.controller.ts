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

    } catch (err) {
        console.log('Error on create product controller', err);
        throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED)
    }
};


export default productController