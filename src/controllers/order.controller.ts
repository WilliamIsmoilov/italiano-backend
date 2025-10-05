import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import Errors, { HTTPCODES, MESSAGE } from '../libs/Errors';
import OrderService from "../models/Order.service";
import { ExtendedRequest } from "../libs/types/member";
import { orderUpdateInput } from "../libs/types/order";



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


orderController.getOrders = async (req: Request, res: Response) => {
    try {
        console.log('getOrders');
        const result = await orderService.getOrders();
        res.send(result)
    } catch (err) {
         console.log( "ERROR getOrders ordersController", err); 
          if(err instanceof Errors) res.status(err.code).json(err);
          else res.status(Errors.standart.code).json(Errors.standart);
        
    }
}

orderController.updateOrder = async( req: ExtendedRequest, res: Response) => {
    try {
        console.log('update orderControloller');
        const input: orderUpdateInput = req.body;
        const result = await orderService.updateOrder(req.member, input)
        res.json(result)
    } catch (err) {
        console.log('Error updateOrder', err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart)
    }
}
export default orderController;