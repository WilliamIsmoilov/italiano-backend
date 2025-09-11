import Errors, { HTTPCODES } from '../libs/Errors';
import { Request, Response, NextFunction } from 'express';
import {T} from '../libs/types/common';
import MemberService from '../models/Member.service';


const memberService = new MemberService();  

const memberController: T = {};

memberController.getRestaurant = async ( req: Request, res: Response) => {
    try {
        console.log('getrestaurant');
        const result = await memberService.getRestaurant();
        res.status(HTTPCODES.OK).json(result)
    }catch (err) {
        console.log('Error getRestaurant memberController', err);
        if(err instanceof Errors) res.status(err.code).json(err)
    }
}

export default memberController;