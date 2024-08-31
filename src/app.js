import express from 'express';
import morgan from "morgan";
import cookieParser from 'cookie-parser';

//importando rutas
import authRoutes from './routes/auth.routes.js'



const app = express()


//middlewares
app.use(morgan('dev'));
//esto es para que express pueda convertir los reqbody en formato json y pueda entenderlos
app.use(express.json());
//este middleware nos permite convertir las cookies a un objeto json
app.use(cookieParser());



//usando las rutas
app.use("/api",authRoutes);
export default app;