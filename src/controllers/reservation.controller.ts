import {T} from '../libs/types/common';
import { NextFunction, Request, Response } from 'express';
import Errors,  { HTTPCODES, MESSAGE} from '../libs/Errors';
import ReservationService from '../models/Reservation.Service';
import { AdminRequest } from '../libs/types/member';
import { ReservationInput } from '../libs/types/reservation';

const reservationService = new ReservationService()
const reservationController: T = {};

reservationController.createReservation = async (req: AdminRequest, res: Response) => {
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