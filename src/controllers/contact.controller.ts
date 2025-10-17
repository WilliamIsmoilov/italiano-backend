import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { OrderInquery, orderUpdateInput, Order } from '../libs/types/order';
import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import Errors, { HTTPCODES, MESSAGE } from '../libs/Errors';
import ContactService from "../models/Contact.service";
import { ContactInput } from '../libs/types/contact';

const contactController: T = {};
const contactService = new ContactService();


contactController.createContact = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log('contact controller');
        const input:ContactInput = req.body
        const result = await contactService.createContact(req.member, input);
        res.status(HTTPCODES.OK).json(result)
    } catch (err) {
        console.log('Error createContact controller', err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart)
    }
}

contactController.getContacts = async (req: Request, res: Response) => {
    try {
        console.log('get Contact');
        const result = await contactService.getContacts();
        console.log('result', result);
        res.send(result)
    } catch (err) {
        console.log('errors get contacts', err)
    }
}

export default contactController