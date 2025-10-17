import Errors, { HTTPCODES, MESSAGE } from '../libs/Errors';
import { Request, Response, NextFunction } from 'express';
import {T} from '../libs/types/common';
import MemberService from '../models/Member.service';
import { ExtendedRequest, LoginInput, Member, MemberInput, MemberUpdateInput } from '../libs/types/member';
import AuthService from '../models/Auth.service';
import { AUTH_TIMER } from '../libs/utils/config';


const memberService = new MemberService(); 
const authService = new AuthService(); 

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

memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log('Signup member controller');
        const input : MemberInput = req.body;
        const result: Member = await memberService.signup(input)
        const token = await authService.createToken(result);
        res.cookie("accessToken", token, {maxAge: AUTH_TIMER*3600*1000, httpOnly:false});
        res.status(HTTPCODES.CREATED).json({member: result, accessToken: token});

    } catch (err) {
        console.log( "ERROR SignUp memberController", err); 
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart); 
    }
}

memberController.login = async(req: Request, res: Response) => {
    try {
        console.log('Login controller')
        const input: LoginInput = req.body;
        const result = await memberService.login(input);
        const token = await authService.createToken(result);

        res.cookie("accessToken", token, {maxAge: AUTH_TIMER*3600*1000, httpOnly:false});
        res.status(HTTPCODES.OK).json({member: result, accessToken: token});
    } catch (err) {
        console.log( "ERROR  login memberController", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

memberController.logout = async ( req: ExtendedRequest, res: Response) => {
    try {
        console.log('Logout controller');
        res.cookie('accessToken', null, {maxAge: 0, httpOnly: true});
        res.status(HTTPCODES.OK).json({logout: true})
    } catch (err) {
        console.log( "Error  Logoout MemberController", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

memberController.getMemberDetail = async ( req: ExtendedRequest, res: Response) => {
    try {
        console.log('getMember Detail');
        const result = await memberService.getMemberDetail(req.member);
        res.status(HTTPCODES.OK).json(result);
    } catch (err) {
        console.log( "Error  getMemberDetail MemberController", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

memberController.updateMember = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log('update member');
        const input: MemberUpdateInput = req.body;
        const result = await memberService.updateMember(req.member, input);
        res.status(HTTPCODES.OK).json(result)
    } catch (err) {
        console.log('Error updateMember Controller', err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart)
    }
}

memberController.varifyAuth =  async (
    req: ExtendedRequest, 
    res: Response,
    next: NextFunction) => {
    try{
        const token = req.cookies["accessToken"];
        if(token) req.member =  await authService.checkAuth(token); 
            
        if(!req.member) throw new Errors(
            HTTPCODES.UNAUTHORIZED, 
            MESSAGE.NOT_AUTHENTICARTED);

            next();
    } catch(err){
        console.log( "Error VarifyAuth memberController", err);
        if(err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
}

memberController.retrieveAuth =  async (
    req: ExtendedRequest, 
    res: Response, 
    next: NextFunction
) => {
    try{
        const token = req.cookies["accessToken"];
        if(token) req.member =  await authService.checkAuth(token); 
        next();

    } catch(err){
        console.log( "Error retrieveAuth MemberController", err);
        next();
    }
}


memberController.forgotPassword = async (req:Request, res: Response) => {
    try {
        const member: Member = req.body;
        const input = req.body; 
        const result = await memberService.forgotPassword(member, input);
        res.status(200).json(result);
    } catch (err) {
        console.log('error on forgotpassword', err)
    }
}


// memberController.verifyResetCode = async(req: Request, res: Response) => {

//     try {
//         const input = req.body
//         console.log('verify Password ')
//         const result = await memberService.verifyResetCode(input)
//     } catch (err) {
//         console.log('error on verifyResetCode', err)
//     }
// }



export default memberController;