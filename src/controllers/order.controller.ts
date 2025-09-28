import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import Errors, { HTTPCODES, MESSAGE } from '../libs/Errors';
import OrderService from "../models/Order.service";
import { ExtendedRequest } from "../libs/types/member";



const orderController: T = {}
const orderService = new OrderService()

orderController.createOrder = async( req: ExtendedRequest, res: Response) => {
    try {
        console.log('create order');
        const result = await orderService.createOrder(req.member, req.body);
        res.status(201).json(result)
    } catch (err) {
       console.log('Error createOrder:', err);
       if(err instanceof Errors) res.status(err.code).json(err);
       else res.status(Errors.standart.code).json(Errors.standart); 
    }
}

export default orderController;