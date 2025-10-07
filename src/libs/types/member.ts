import {ObjectId} from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import {Request} from "express";
import { Session } from "express-session";


export interface Member{
    _id: ObjectId;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberNick: string;
    memberEmail: string,
    memberReservation: string;
    memberLocation: string,
    memberPhone: string;
    memberPassword?: string;
    memberAddress?: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface LoginInput{
    memberEmail: string;
    memberPassword: string;
}

export interface MemberInput{
    _id: ObjectId;
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberReservation?: string,
    memberEmail: string;
    memberNick: string;
    memberPhone: string;
    memberPassword: string;
    memberAddress: string;
}

export interface AdminRequest extends Request {
    member: Member;
    session: Session & { member: Member };
    file: Express.Multer.File;
    files: Express.Multer.File[];
}

export interface User {
  id: string;
  email: string;
  password: string; 
}

export interface ExtendedRequest extends Request{
    member: Member;
    file: Express.Multer.File;
    files: Express.Multer.File[];
}

export interface MemberUpdateInput{
    _id: ObjectId;
    memberStatus?: MemberStatus;
    memberNick?: string;
    memberPhone?: string;
    memberPassword?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberEmail?:string;
}