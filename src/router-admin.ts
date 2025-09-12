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

export default routerAdmin;