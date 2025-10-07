import { FullOrder, Order, OrderInquery, OrderItemInput, orderUpdateInput } from "../libs/types/order";
import { Member } from "../libs/types/member";
import OrderModel from "../schema/Order.Model"
import OrderItem from "../schema/OrderItem.Model";
import { shapeIntoMongooseObjectId } from "../libs/utils/config";
import { ObjectId, Types } from "mongoose";
import { HTTPCODES, MESSAGE } from "../libs/Errors";
import Errors from "../libs/Errors";
import sendMailer from '../libs/sendMailer/mailer';
import session from 'express-session';


class OrderService {
    private readonly orderModel;
    private readonly orderItemModel;

    constructor(){
        this.orderModel = OrderModel;
        this.orderItemModel = OrderItem;
    }

    public async createOrder(member: Member, input: FullOrder): Promise<Order>{
        const memberId = shapeIntoMongooseObjectId(member._id);
        const amount = input.items.reduce((accumulator: number, item: OrderItemInput)=> {
            return accumulator + item.itemPrice * item.itemQuantity
        }, 0)
        const delivery = amount < 100 ? 5 : 0;
        console.log('Value:', amount, delivery)

        try {
            const newOrder: Order = await this.orderModel.create({
                orderTotal: amount + delivery,
                orderDelivery: delivery,
                memberId: memberId,

                memberNick: input.customer.memberNick,
                memberPhone: input.customer.memberPhone,
                memberEmail: input.customer.memberEmail,
                memberAddress: input.customer.memberAddress,
                orderMethod: input.customer.orderMethod,
                payment: input.customer.payment,
                notes: input.customer.notes

            }) as unknown as Order

            const orderId = newOrder._id;
            console.log('OrderId:', orderId);
            await this.recordOrderItem(orderId, input.items)

            await sendMailer.sendMail({
                email: input.customer.memberEmail,
                subject: "New order information",
                text: `Assalomu aleykum hurmatli ${input.customer.memberNick} haridingiz uchun raxmat.
                Sizning mahsulotingiz ${ new Date().toLocaleString()} da buyurtma qilindi va 30-50 daqiqa orasida yetib boradi. Bizni tanlaganingiz uchun raxmat!
                `
            })
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

    /** Backend GetOrders **/

   public async getOrders(): Promise<Order[]>{
    try {
        const result = await this.orderModel
     .find().sort({createdAt: -1}).exec();

     if(!result || result.length === 0){
        throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND);
     }
     return result.map(doc => doc.toObject() as Order)
    } catch (err) {
        console.log('Error on getOrder', err);
        throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.SOMETHING_WENT_WRONG)
    }
    
   }


   public async updateOrder(member: Member, input: orderUpdateInput): Promise<Order>{
      const memberId = shapeIntoMongooseObjectId(member._id);
      const orderId = shapeIntoMongooseObjectId(input.orderId);
      const session = await this.orderModel.startSession();
      session.startTransaction();

      try {
        const order = await this.orderModel.findOne({_id: orderId, memberId}).session(session)
        if(!order) throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND);

        const createdAt = order.createdAt.getTime();
        const now = Date.now();
        const diffMinutes = (now - createdAt) /1000 / 60;

        if(diffMinutes > 5){
            throw new Errors(HTTPCODES.FORBIDDEN, MESSAGE.SOMETHING_WENT_WRONG)
        }

        if(input.removedItemIds?.length){
            await this.orderItemModel.deleteMany(
                {_id: {$in: input.removedItemIds.map(id => new Types.ObjectId(id))}},
                {session}
            )
        }
        

        if(input.updatedItems?.length){
            for( const item of input.updatedItems){
                await this.orderItemModel.findByIdAndUpdate(
                    item.itemId,
                    {
                       ...(item.newQuantity && { itemQuantity: item.newQuantity}),
                       ...(item.newPrice && { itemPrice: item.newPrice})
                    },
                    {session}
                )
            }
        }

        if(input.newItems?.length){
            const newItems = input.newItems.map(i => ({
                ...i,
                orderId,
            }));
            await this.orderItemModel.insertMany(newItems, {session})
        }

        const allItems = await this.orderItemModel.find({orderId}).session(session);
        const newAmount = allItems.reduce(
            (accumulator:number, item) => accumulator + item.itemQuantity * item.itemPrice, 0
        );
        const delivery = newAmount < 100 ? 5 : 0;
        const totalSum = newAmount + delivery;
        console.log("Value:", newAmount, delivery);


        const updateOrder = await this.orderModel.findByIdAndUpdate(
            {_id: orderId, memberId},
            {orderTotal: totalSum, orderDelivery: delivery},
            {new: true, session}
        ).exec()

        if(!updateOrder)
            throw new Errors(HTTPCODES.NOT_MODIFIED, MESSAGE.UPDATE_FAILED);

        await session.commitTransaction();
        session.endSession();
        return updateOrder as unknown as Order
      } catch (err) {
         await session.abortTransaction();
         session.endSession();
         console.log("Error in updateOrder:", err);
         throw err;
      }
   }

   public async getMyOrders(member: Member,inquery: OrderInquery): Promise<Order[]>{
    const memberId = shapeIntoMongooseObjectId(member._id);
    const matches = {memberId: memberId, orderStatus: inquery.orderStatus};

    const result = await this.orderModel.aggregate([
        { $match: matches},
        { $sort: {updatedAt: -1}},
        { $skip: (inquery.page -1) * inquery.limit},
        { $limit: inquery.limit},
        { $lookup: {
            from: 'orderItems',
            localField: '_id',
            foreignField: 'orderId',
            as: 'orderItems'
        }},
        {$lookup: {
                
            from: 'products',
            localField:'orderItems.productId',
            foreignField: '_id',
            as: 'productData'
        }}
    ]).exec();
    if(!result) throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND);
    return result
   }
   
}

export default OrderService;