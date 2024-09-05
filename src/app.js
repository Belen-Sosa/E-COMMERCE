import express from 'express';
import morgan from "morgan";
import cookieParser from 'cookie-parser';

//importando rutas
import authRoutes from './routes/auth.routes.js'
import categoryRoutes from './routes/categories.routes.js'
import productRoutes from './routes/products.routes.js'
import orderRoutes from './routes/order.routes.js'
import paymentRoutes from './routes/payments.routes.js'
import cartRoutes from './routes/cart.routes.js'
const app = express()


//middlewares
app.use(morgan('dev'));
//esto es para que express pueda convertir los reqbody en formato json y pueda entenderlos
app.use(express.json());
//este middleware nos permite convertir las cookies a un objeto json
app.use(cookieParser());



//usando las rutas
app.use("/api",authRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",paymentRoutes);
app.use("/api",cartRoutes);
export default app;