import Errors, { MESSAGE, HTTPCODES } from "../libs/Errors";
import sendMailer from '../libs/sendMailer/mailer';
import { shapeIntoMongooseObjectId } from "../libs/utils/config";
import ReservationModel from "../schema/Reservation.Model";
import { MemberType } from "../libs/enums/member.enum";
import { Reservation, ReservationInput } from "../libs/types/reservation";
import { Member } from "../libs/types/member";


class ReservationService {
    private readonly reservationModel;
    constructor(){
        this.reservationModel = ReservationModel
    }

public async createReservation(member: Member, input: ReservationInput): Promise<Reservation>{
   const memberId = shapeIntoMongooseObjectId(member._id)
    try {
        const result = await this.reservationModel.create({
            memberId: memberId,
            input
        })
        return result.toObject() as Reservation;
    } catch (err) {
        console.log("Error, model: createOrder:", err);
        throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED)
    }
}
};

export default ReservationService;