import { AdminRequest, ExtendedRequest, LoginInput,  MemberInput } from '../libs/types/member';
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { NextFunction, Request, Response } from "express";
import Errors, { HTTPCODES, MESSAGE } from '../libs/Errors';
import { MemberType } from '../libs/enums/member.enum';
import OrderService from '../models/Order.service';

const memberService = new MemberService();
const orderService = new OrderService()

const restaurantController:  T = {};

restaurantController.goHome = async (req: Request, res: Response) => {
    try {
        console.log('go home')
        res.render('home')
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

restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log('Process login');
        const input: LoginInput = req.body;

        const memberService = new MemberService();
        const result = await memberService.processLogin(input)
        //==
        req.session.member = result;
       req.session.save( function () {
         res.redirect("/admin/product/all");
       });
    } catch (err) {
         console.log( "ERROR  Process login", err);
        const message = 
         err instanceof Errors ? err.message : MESSAGE.SOMETHING_WENT_WRONG;
        res.send(`<script> alert("${message}"); window.location.replace('/admin/login') </script>`);
    }
} 

restaurantController.processSignup = async ( req: AdminRequest, res: Response) => {
    try {
        console.log('Process Signup');
        console.log('body:', req.body)
        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;
        const result = await memberService.processSignup(newMember);
        //===
        req.session.member = result;
        req.session.save( function () {
        res.redirect("/admin/product/all");
           });
        res.send(result);
    } catch (err) {
        console.log( "ERROR  Process SignUp", err);
        const message = 
        err instanceof Errors ? err.message : MESSAGE.SOMETHING_WENT_WRONG;
        res.send(`<script> alert("${message}"); window.location.replace('/admin/signup') </script>`);
    }
}


restaurantController.logout = async ( req: Request, res: Response) => {
    try {
        console.log('Logout');
         req.session.destroy( function() {
            res.redirect("/admin");
        });

    } catch (err) {
        console.log( "ERROR  Process logout", err);
        res.redirect("/admin");
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

// restaurantController.getReservation = async(req: Request, res: Response) => {
//     try {
//         console.log('getReservation controller');
//         const memberId = req.params.memberId;
//         console.log('getReservation:', memberId)
        
//         const result = await memberService.getReservation(memberId);
//         console.log('result:', result)
//     } catch (err) {
//         console.log('Error getReservation', err)
//         res.redirect('/admin/login')
//     }
//}

restaurantController.checkAuthSession =  async (req:AdminRequest, res: Response) =>{
    try {
        console.log("Check Auth Session");
        if(req.session?.member) res.send(`<script> alert(" ${req.session.member.memberNick}") </script>`);
        else res.send(`<script> alert("${MESSAGE.NOT_AUTHENTICARTED}") </script>`);
    } catch(err){
        console.log( "ERROR  CHECK AUTHENTICATION Session", err);
        res.send(err);
    }  
};

restaurantController.varifyRestaurant = (
    req: AdminRequest,
    res:Response,
    next: NextFunction,
) => {
    
    if(req.session?.member?.memberType === MemberType.RESTAURANT){
        req.member = req.session.member;
        next();
    } else {
        const messaage = MESSAGE.NOT_AUTHENTICARTED;
        res.send(`<script>alert("${messaage}"); window.location.replace('/admin/login'); </script>`);
    }
};



export default restaurantController;