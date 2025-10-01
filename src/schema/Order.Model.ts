import { OrderMethod, OrderStatus, PaymentMethod } from '../libs/enums/order.enum';
import {Product} from '../libs/types/product';
import mongoose, {Schema} from 'mongoose'
import { Order } from '../libs/types/order';

const  OrderItemSchema = new Schema({
    orderTotal: {
        type: Number,
        required: true
    },
    orderDelivery: {
        type: Number,
        required: true
    },
    orderStatus:{
        type: String,
        enum:OrderStatus,
        default: OrderStatus.PAUSE
    },
    memberId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
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