import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import Errors, { HTTPCODES, MESSAGE } from '../libs/Errors';
import OrderService from "../models/Order.service";
import { ExtendedRequest } from "../libs/types/member";
import { OrderInquery, orderUpdateInput, Order } from '../libs/types/order';
import { OrderStatus } from "../libs/enums/order.enum";



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

orderController.getMyOrders = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log('getMyOrders');
        const {page, limit, orderStatus} = req.query;
        const inquery: OrderInquery ={
            page: Number(page),
            limit: Number(limit) ,
            orderStatus: orderStatus as OrderStatus
        };
        console.log('inquery:', inquery);
        const result = await orderService.getMyOrders(req.member, inquery)
        res.status(200).json(result)
    } catch (err) {
        console.log("error on getMyOrders controller:", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}
export default orderController;