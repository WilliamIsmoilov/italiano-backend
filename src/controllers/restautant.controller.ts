import { LoginInput, Member } from '../libs/types/member';
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { Request, Response } from "express";
import Errors, { MESSAGE } from '../libs/Errors';

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
        console.log( "ERROR signup", err);
        res.redirect('/admin')
        
    }  

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log('go login')
        res.send('login')
    } catch (err) {
        console.log('Error login', err);
        res.redirect('/admin')
    }

restaurantController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log('Process login');
        const input: LoginInput = req.body;

        const memberService = new MemberService();
        const result = await memberService.processLogin(input)
    } catch (err) {
        console.log('Error Process Login', err)
        const message = 
          err instanceof Errors ? err.message : MESSAGE.SOMETHING_WENT_WRONG;
          res.send(`<script> alert('${message}'): window.location.replace('/admin/login)</script>`)
    }
}    
}
};

export default restaurantController;