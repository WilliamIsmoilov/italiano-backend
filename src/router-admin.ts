import express from 'express';
const routerAdmin = express.Router();
import restaurantController from './controllers/restautant.controller';

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
 .post('/updateChosenUser',
    restaurantController.varifyRestaurant,
    restaurantController.updateChosenUser
 );

 routerAdmin
.get("/check-me", restaurantController.checkAuthSession);

export default routerAdmin;