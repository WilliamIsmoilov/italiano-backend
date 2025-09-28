import {Product} from '../libs/types/product';
import mongoose, {Schema} from 'mongoose'

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
    }
}, {timestamps: true, collection: 'orderItems'}
);

export default mongoose.model('OrderModal', OrderItemSchema)