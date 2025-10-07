import { ObjectId } from "mongoose";
import { OrderMethod, OrderStatus, PaymentMethod } from "../enums/order.enum";
import { Product } from "./product";

export interface OrderItemInput {
    productId: ObjectId;
    itemQuantity: number;
    itemPrice: number;
    orderId? : ObjectId;
}

export interface  Order{
    _id: ObjectId;
    orderTotal: number;
    orderDelivery: number;
    orderStatus: OrderStatus;
    memberId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    /**from aggregation */
    orderItems: OrderItem[];
    productData: Product[];
}

export interface OrderItem {
    _id: ObjectId;
    itemQuantity: number;
    itemPrice: number;
    orderId: ObjectId;
    productId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export interface CustomerInput{
    memberNick: string,
    memberPhone: string,
    memberAddress: string,
    memberEmail: string,
    payment: PaymentMethod,
    orderMethod: OrderMethod,
    notes?: string

};

export interface FullOrder{
  items: OrderItemInput[];
  customer: CustomerInput;
}

export interface orderUpdateInput {
    orderId:string;
    updatedItems?: {
        itemId: string;
        newQuantity?: number;
        newPrice?: number;
    }[];
    newItems?: {
        productId: string;
        itemQuantity: number;
        itemPrice: number;
    }[];
    removedItemIds?: string[];    
}

export interface OrderInquery{
    page: number;
    limit: number;
    orderStatus: OrderStatus;
}