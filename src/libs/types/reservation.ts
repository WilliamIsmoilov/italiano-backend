import { ObjectId } from "mongoose";

export interface Reservation{
    _id: ObjectId;
    memberId: ObjectId
    reservationDate: string;
    reservationTime: string;
    reservationSize: Number;
    memberNick: string;
    memberLastName: string;
    memberPhone: number;
    memberEmail: string;
    reservationRequest: string;
    createdAt: Date;
    updatedAt: Date;
}