import express from 'express';
import path from "path";
import routerAdmin from './router-admin';
import router from './router';
import cookieParser from 'cookie-parser';



//entrance
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//json webToken


//views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//routes
app.use('/',  router)             // react    SPA
app.use('/admin', routerAdmin)  //ejs/ssr   SSR



export default app;