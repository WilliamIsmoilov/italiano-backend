import express from 'express';
const router = express.Router();
import memberController from "./controllers/member.controller";

//Member
router.get('/member/restaurant', memberController.getRestaurant)
router.post('/member/signup', memberController.signup)
router.post('/member/login', memberController.login)

export default router;