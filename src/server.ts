import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
mongoose.set("strictQuery", true);
import app from './app'


mongoose 
.connect(process.env.MONGO_URL as string, {})
.then((data) => {
    console.log("MongoDB connected succesfully")
    const PORT = process.env.PORT ?? 3004;
    app.listen(PORT, function(){
        console.log(`The server is runnig succesfully on a port ${PORT}`);
        console.log(`Backend project is running on http://localhost:${PORT}/admin \n`)
    })
})
.catch((err) => console.log('Erro has been occured', err));