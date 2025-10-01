import express from 'express';
const router = express.Router();
import memberController from "./controllers/member.controller";
import productController from './controllers/product.controller';
import orderController from './controllers/order.controller';

//Member
router.post('/member/signup', memberController.signup);
router.post('/member/login', memberController.login);
router.post('/member/logout',memberController.varifyAuth, memberController.logout);
router.post('/member/update', memberController.varifyAuth, memberController.updateMember);
router.post('/order/create', memberController.varifyAuth, orderController.createOrder)



//get
router.get('/member/restaurant', memberController.getRestaurant);
router.get('/member/detail',memberController.varifyAuth, memberController.getMemberDetail)
router.get('/product/all', productController.getProducts);
router.get('/product/:id', productController.getProduct);
router.post('order/create', memberController.varifyAuth, orderController.createOrder)
   
    


export default router;