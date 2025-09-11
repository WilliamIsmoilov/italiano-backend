import {ObjectId} from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import {Request} from "express";


export interface Member{
    _id: ObjectId;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberNick: string;
    memberEmail: string,
    memberLocation: string,
    memberPhone: string;
    memberPassword?: string;
    memberAddress?: string;
    memberDesc?: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface LoginInput{
    memberEmail: string;
    memberPassword: string;
}