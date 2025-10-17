import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";


const memberSchema = new Schema({
    memberType: {
        type: String,
        enum: MemberType,
        default: MemberType.USER
    },

    memberStatus: {
        type: String,
        enum: MemberStatus,
        default: MemberStatus.ACTIVE,
    },

    memberNick: {
        type: String,
        required: true,
    },

    memberEmail: {
        type: String,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        required: true,
        unique: true
    },

    memberPhone: {
        type: String,
        index:{ unique: true, sparse: true },
        required: true
    },

    memberPassword:{
        type: String,
        select: false,
        required: true
    },

    memberAddress: {
        type: String,
        required: [true, 'Please add an address'],
    },

    memberLocation:{
         type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
          
          },
          coordinates: {
            type: [Number],
            index: '2dsphere'
          }, 

          formattedAddress: String,
          street: String,
          city: String,
          state: String,
          zipcode: String,
          country: String,
    },
    
    memberReservation: {
        type: String

    },
    
    memberDesc: {
        type: String,
    }
},
   { timestamps: true} //createdAt, updatedAt
);

export default mongoose.model("Member", memberSchema);