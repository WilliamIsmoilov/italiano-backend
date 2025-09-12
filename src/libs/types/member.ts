import {ObjectId} from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";
import {Request} from "express";


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
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberEmail: string;
    memberNick: string;
    memberPhone: string;
    memberPassword: string;
    memberAddress: string;
}

export interface AdminRequest extends Request{
    member: Member;
}