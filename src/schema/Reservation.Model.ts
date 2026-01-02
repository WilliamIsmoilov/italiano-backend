import { Schema, ObjectId } from 'mongoose';
import mongoose from "mongoose";
import { ReservationStatus } from '../libs/enums/reservation.enum';

const reservationSchema = new Schema({
    memberId:{
        type: Schema.Types.ObjectId,
        ref: 'Member', required: true
    },
  reservationDate: {
    type: String,
    required: true
  },
  reservationTime: {
    type: String,
    required: true
  },
  reservationSize: {
    type: Number,
    required: true
  },
  memberNick:{
    type: String,
    required: true
  },
  memberLastName:{
    type: String,
    required: true
  },
  memberPhone: {
    type: String,
    required: true
  },
  memberEmail: {
    type: String,
    required: true
  },
  reservationRequest: {
    type: String
  },
  reservationStatus: {
    type: String,
    enum: ReservationStatus,
    default: ReservationStatus.ACTIVE
  }
},
{timestamps: true} // createdAt, updatedAt
);

export default mongoose.model('Reservation', reservationSchema)