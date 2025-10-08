import express from 'express';
const routerAdmin = express.Router();
import restaurantController from './controllers/restautant.controller';
import makeUploader from './libs/utils/uploader';
import productController from './controllers/product.controller';
import router from './router';
import orderController from './controllers/order.controller';

routerAdmin.get('/', restaurantController.goHome)


routerAdmin
.get('/signup', restaurantController.getSignup)
.post('/signup', restaurantController.processSignup);

routerAdmin
 .get('/login', restaurantController.getLogin)
 .post('/login', restaurantController.processLogin)

routerAdmin
 .get('/logout', restaurantController.logout)

routerAdmin 
  .get('/user/all',
    restaurantController.varifyRestaurant,
    restaurantController.getUsers);

routerAdmin
 .post('/user/edit',
    restaurantController.varifyRestaurant,
    restaurantController.updateChosenUser
 );

 routerAdmin
  .get('/getOrders',
    restaurantController.varifyRestaurant,
    orderController.getOrders);

 routerAdmin
.get("/check-me", restaurantController.checkAuthSession);

/** Product */

routerAdmin
  .post("/product/create", 
     restaurantController.varifyRestaurant,
        makeUploader("products").array("productImages", 5),
     productController.createNewProduct)
    
routerAdmin
 .post('/product/:id', restaurantController.varifyRestaurant,
   productController.updateChosenProducts
 )

routerAdmin
.get("/product/all", 
    restaurantController.varifyRestaurant,
    productController.getAllProducts
);
   
export default routerAdmin;