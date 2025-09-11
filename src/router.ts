import express from 'express';
const router = express.Router();
import memberController from "./controllers/member.controller";

//Member
router.get('/member/restaurant', memberController.getRestaurant)

export default router;