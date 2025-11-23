import cors from 'cors'
import express from 'express';
import path from "path";
import routerAdmin from './router-admin';
import router from './router';
import cookieParser from 'cookie-parser';
import { T } from './libs/types/common';
import session from 'express-session';
import ConnectMongoDB from "connect-mongodb-session";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: "sessions",
});

//entrance
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({credentials: true, origin: true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));




//SESSIONS
app.use(
 session({
     secret: String(process.env.SESSION_SECRET),
      cookie: { 
    maxAge: 1000 * 3600 * 6, // 6h
   },
   store: store,
  resave: true,
  saveUninitialized: true
 })
);

app.use( function (req, res, next){
    const sessionInstance = req.session as T;
    res.locals.member = sessionInstance.member;
    next();
})


//views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//routes
app.use('/',  router)             // react    SPA
app.use('/admin', routerAdmin)  //ejs/ssr   SSR

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: data:;"
  );
  next();
});




export default app;