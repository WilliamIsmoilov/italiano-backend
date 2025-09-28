import { Order, OrderItemInput } from "../libs/types/order";
import { Member } from "../libs/types/member";
import OrderModel from "../schema/Order.Model"
import OrderItem from "../schema/OrderItem.Model";
import { shapeIntoMongooseObjectId } from "../libs/utils/config";
import { ObjectId } from "mongoose";
import { HTTPCODES, MESSAGE } from "../libs/Errors";
import Errors from "../libs/Errors";


class OrderService {
    private readonly orderModel;
    private readonly orderItemModel;

    constructor(){
        this.orderModel = OrderModel;
        this.orderItemModel = OrderItem;
    }

    public async createOrder(member: Member, input: OrderItemInput[]): Promise<Order>{
        const memberId = shapeIntoMongooseObjectId(member._id);
        const amount = input.reduce((accumulator: number, item: OrderItemInput)=> {
            return accumulator + item.itemPrice * item.itemQuantity
        }, 0)
        const delivery = amount < 100 ? 5 : 0;
        console.log('Value:', amount, delivery)

        try {
            const newOrder: Order = await this.orderModel.create({
                orderTotal: amount + delivery,
                orderDelivery: delivery,
                memberId: memberId
            }) as unknown as Order

            const orderId = newOrder._id;
            console.log('OrderId:', orderId);
            await this.recordOrderItem(orderId, input)
            return newOrder
        } catch (err) {
            console.log('Error, model: createOrder', err)
            throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED)
        }
    }


    private async recordOrderItem(
        orderId: ObjectId,
        input: OrderItemInput[]
        ) : Promise<void> {
           const  listPromise =  input.map( async (item: OrderItemInput) => {
                item.orderId = orderId;
                item.productId = shapeIntoMongooseObjectId(item.productId);
                await this.orderItemModel.create(item);
                return 'Inserted';
            });

        const orderItemState = await Promise.all(listPromise);
        console.log('OrderItemState', orderItemState);   

    }


   
}

export default OrderService;