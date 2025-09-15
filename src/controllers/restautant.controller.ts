import { AdminRequest, LoginInput,  MemberInput } from '../libs/types/member';
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { Request, Response } from "express";
import Errors, { HTTPCODES, MESSAGE } from '../libs/Errors';
import { MemberType } from '../libs/enums/member.enum';

const memberService = new MemberService();

const restaurantController:  T = {};

restaurantController.goHome = async (req: Request, res: Response) => {
    try {
        console.log('go home')
        res.send('<h1>Go Home   </h1>')
    } catch (err) {
        console.log('Go home restaurant controller', err)
        
    }
}

restaurantController.getSignup = (req: Request, res: Response) =>{
    try {
        console.log( "go signup");
        res.send("<h1> Get SignUp</h1>");
    } catch(err){
        console.log( "ERROR signup", err)
        res.redirect('/admin')
        
    }  
}

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log('go login')
        res.send('login')
    } catch (err) {
        console.log('Error login', err);
        res.redirect('/admin')
    }
}

restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log('Process login');
        const input: LoginInput = req.body;

        const memberService = new MemberService();
        const result = await memberService.processLogin(input)
        res.send(result)
    } catch (err) {
        console.log('Error Process Login', err)
    }
} 

restaurantController.processSignup = async ( req: AdminRequest, res: Response) => {
    try {
        console.log('Process Signup');
        console.log('body:', req.body)
        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;
        const result = await memberService.processSignup(newMember);
        res.send(result);
    } catch (err) {
        console.log('Error Process Signup', err);
    }
}


restaurantController.logout = async ( req: Request, res: Response) => {
    try {
        console.log('Logout');

    } catch (err) {
        console.log('Error process logoout', err)
    }
}

restaurantController.getUsers = async (req: Request, res: Response) => {
    try {
        console.log('getUsers');
        const result = await memberService.getUsers();
        console.log('result', result)
    } catch (err) {
        console.log('Error getUsers', err)
        res.redirect('/admin/login')
    }
}

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
    try {
        console.log('updateChosenUser')
        const result = await memberService.updateChosenUser(req.body);
        res.status(HTTPCODES.OK).json({data: result})
    } catch (err) {
        console.log('Error updateChosenUser', err)
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

export default restaurantController;