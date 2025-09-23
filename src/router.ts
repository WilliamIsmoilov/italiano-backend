import express from 'express';
const router = express.Router();
import memberController from "./controllers/member.controller";

//Member
router.get('/member/restaurant', memberController.getRestaurant);
router.post('/member/signup', memberController.signup);
router.post('/member/login', memberController.login);
router.post('/member/logout',memberController.varifyAuth, memberController.logout);
router.post('/member/update', memberController.varifyAuth, memberController.updateMember)


//get
router.get('/member/detail',memberController.varifyAuth, memberController.getMemberDetail)
   
    


export default router;