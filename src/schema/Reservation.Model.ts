import { Schema } from "mongoose";
import mongoose from "mongoose";

const reservationSchema = new Schema({
  reservationDate: {
    type: String,
    required: [true, 'Please choose the date']
  },
  reservationTime: {
    type: String,
    required: [true, "Please add time"]
  },
  reservationSize: {
    type: Number,
    required: [true, 'Please insert party size']
  },
  memberNick:{
    type: String,
    required: [true, 'Please add your name']
  },
  memberLastName:{
    type: String,
    required: [true, 'Please add your surname!']
  },
  memberPhone: {
    type: Number,
    required: true
  },
  memberEmail: {
    type: String,
    required: true
  },
  reservationRequest: {
    type: String
  }
},
{timestamps: true} // createdAt, updatedAt
);

export default mongoose.model('Reservation', reservationSchema)