import {T} from '../libs/types/common';
import { NextFunction, Request, Response } from 'express';
import Errors,  { HTTPCODES, MESSAGE} from '../libs/Errors';
import ReservationService from '../models/Reservation.Service';
import { AdminRequest, ExtendedRequest } from '../libs/types/member';
import { ReservationInput } from '../libs/types/reservation';

const reservationService = new ReservationService()
const reservationController: T = {};

reservationController.createReservation = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log('Create Reservation controller');
        const data: ReservationInput = req.body;
        await reservationService.createReservation(req.member, data);
        res.send(data)
    } catch (err) {
        console.log('Error on create product controller', err);
        throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED)
    }
}


reservationController.cancelReservation = async (req: ExtendedRequest, res: Response)=>{
    try {
        console.log('cancel Reservation');
        const {id} = req.params;
        await reservationService.cancelReservation(req.member, id);
        res.status(200).json({message:"Deleted"})
    } catch (err) {
        console.log('Error deleteReservation:', err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
    }
}


reservationController.getAllReservations = async(req: Request, res: Response) => {
  try {
    console.log('get all products');
    const data = await reservationService.getAllReservations();
    console.log('data:', data)
    res.send(data)
  } catch (err) {
    console.log('Error getAllReservations', err)
    if(err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standart.code).json(Errors.standart)
  }
}

reservationController.getMyReservation = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log('get my orders');
        const result = await reservationService.getMyReservation(req.member)
        res.status(200).json(result)
    } catch (err) {
        console.log( "Error getMyReservation:", err); 
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}
export default reservationController