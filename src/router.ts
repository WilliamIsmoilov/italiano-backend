import express from 'express';
const router = express.Router();
import memberController from "./controllers/member.controller";
import productController from './controllers/product.controller';
import orderController from './controllers/order.controller';
import reservationController from './controllers/reservation.controller';
import contactController from './controllers/contact.controller';

//Member
router.post('/member/signup', memberController.signup);
router.post('/member/login', memberController.login);
router.post('/member/logout',memberController.varifyAuth, memberController.logout);
router.post('/member/update', memberController.varifyAuth, memberController.updateMember);
router.post('/order/create', memberController.varifyAuth, orderController.createOrder);
router.post('/order/update', memberController.varifyAuth, orderController.updateOrder);
router.post('/reservation/create', memberController.varifyAuth, reservationController.createReservation);
router.post('/contact/create', memberController.varifyAuth, contactController.createContact )




//get
router.get('/member/restaurant', memberController.getRestaurant);
router.get('/member/detail',memberController.varifyAuth, memberController.getMemberDetail)
router.get('/product/all', productController.getProducts);
router.get('/product/:id', productController.getProduct);
router.get('/order/all', memberController.varifyAuth, orderController.getMyOrders)
router.get('/reservation/my', memberController.varifyAuth, reservationController.getMyReservation)

//delete
router.delete('/reservation/delete/:id', memberController.varifyAuth, reservationController.cancelReservation)

   
    


export default router;