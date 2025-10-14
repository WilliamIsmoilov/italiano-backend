import Errors, { MESSAGE, HTTPCODES } from "../libs/Errors";
import sendMailer from '../libs/sendMailer/mailer';
import { shapeIntoMongooseObjectId } from "../libs/utils/config";
import ReservationModel from "../schema/Reservation.Model";
import { MemberType } from "../libs/enums/member.enum";
import { Reservation, ReservationInput } from "../libs/types/reservation";
import { Member } from "../libs/types/member";
import fs from 'fs';
import path from 'path';


class ReservationService {
    private readonly reservationModel;
    constructor(){
        this.reservationModel = ReservationModel
    }

public async createReservation(member: Member, input: ReservationInput): Promise<Reservation>{
   const memberId = shapeIntoMongooseObjectId(member._id)
   const templatePath = path.join(__dirname, '../libs/sendMailer/reservation.html');
     let htmlContent = fs.readFileSync(templatePath, 'utf8');
     htmlContent = htmlContent
        .replace(/{{\s*memberNick\s*}}/g, input.memberNick?.trim() || member.memberNick)
        .replace(/{{\s*memberLastName\s*}}/g, input.memberLastName)
        .replace(/{{\s*reservationDate\s*}}/g, input.reservationDate)
        .replace(/{{\s*reservationTime\s*}}/g, input.reservationTime)
        .replace(/{{\s*reservationSize\s*}}/g, input.reservationSize.toString())
        .replace(/{{\s*reservationRequest\s*}}/g, input.reservationRequest || 'Yo‘q');
    try {
        const result = await this.reservationModel.create({
            memberId: memberId,
            memberLastName: input.memberLastName,
            memberNick: input.memberNick?.trim() || member.memberNick,
            memberEmail: member.memberEmail,
            memberPhone: input.memberPhone?.trim() || member.memberPhone,
            reservationDate: input.reservationDate,
            reservationTime: input.reservationTime,
            reservationSize: input.reservationSize,
            reservationRequest: input.reservationRequest || ''

        }) 
        await sendMailer.sendMail({
            email: member.memberEmail,
            subject: "Reservation Complete",
            html: htmlContent
        })
        return result.toObject() as Reservation;
    } catch (err) {
        console.log("Error, model: createOrder:", err);
        throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED)
    }
}

public async cancelReservation(member: Member, reservationId: string):Promise<void>{
    const memberId = shapeIntoMongooseObjectId(member._id);
    const _id = shapeIntoMongooseObjectId(reservationId)
  const reservation = await this.reservationModel.findOne({_id, memberId})
  if(!reservation){
    throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND)
  }

  const now = new Date();
  const reservationDateTime = new Date(`${reservation.reservationDate}T${reservation.reservationTime}`)
  const limitHours = (reservationDateTime.getTime() - now.getTime())/(1000 * 60 * 60)
  if(limitHours < 8){
    throw new Errors(HTTPCODES.FORBIDDEN, MESSAGE.SOMETHING_WENT_WRONG)
  }

  await this.reservationModel.deleteOne({_id, memberId})
}

public async getAllReservations(): Promise<Reservation[]>{
    const result = await this.reservationModel
     .find()
     .exec()
     if(!result) throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND);
     return result.map(doc => doc.toObject() as Reservation);
}

public async getMyReservation(member: Member): Promise<Reservation[]>{
    const memberId = shapeIntoMongooseObjectId(member._id);
    const result = await this.reservationModel
       .find({memberId})
       .sort({reservationDate:1, reservationTime:1})
       .exec()
       return result.map(doc => doc.toObject() as Reservation);

}
};

export default ReservationService;