import { OrderMethod, PaymentMethod } from '../libs/enums/order.enum';
import {Product} from '../libs/types/product';
import mongoose, {Schema} from 'mongoose'
import { Order } from '../libs/types/order';

const  OrderItemSchema = new Schema({
    itemPrice: {
        type: Number,
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    memberNick: {
        type: String,
        required: true
    },
    memberEmail: {
        type: String,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        required: true
    },
    memberAddress: {
        type: String,
        required: true
    },
    memberPhone: {
        type: String,
        required: true 
    },
    orderMethod: {
        type: String,
        enum: OrderMethod,
        default: OrderMethod.DELIVERY,
        required: true
    },
    payment: {
        type: String,
        enum: PaymentMethod,
        default: PaymentMethod.CREDIT_CARD,
        required: true
    },
    notes: {
        type: String
    }
}, {timestamps: true, collection: 'orderItems'}
);

export default mongoose.model('OrderModal', OrderItemSchema)