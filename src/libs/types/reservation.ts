import { ObjectId } from "mongoose";

export interface Reservation{
    _id: ObjectId;
    memberId: ObjectId
    reservationDate: string;
    reservationTime: string;
    reservationSize: number;
    memberNick: string;
    memberLastName: string;
    memberPhone: string;
    memberEmail: string;
    reservationRequest?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReservationInput{
    reservationDate: string;
    reservationTime: string;
    reservationSize: number;
    memberNick: string;
    memberLastName: string;
    memberPhone: string;
    memberEmail: string;
    reservationRequest?: string; 
}