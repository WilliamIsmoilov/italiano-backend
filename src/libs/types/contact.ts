import { ObjectId, Types } from "mongoose";

export interface Contact{
    _id: ObjectId;
    memberId: ObjectId,
    memberNick: string,
    memberLastName: string,
    memberEmail: string,
    contactSubject: string,
    contactMessage: string,
    createdAt: Date;
    updatedAt: Date;
}

export interface ContactInput{
    memberNick: string,
    memberLastName: string,
    memberEmail: string,
    contactSubject: string,
    contactMessage: string,
}