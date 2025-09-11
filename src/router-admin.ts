import express from 'express';
const routerAdmin = express.Router();
import restaurantController from './controllers/restautant.controller'

routerAdmin
.get('/', restaurantController.goHome)

routerAdmin
 .get('/signup', restaurantController.getSignup)



export default routerAdmin;