import express from 'express';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

//importando rutas
import authRoutes from './routes/auth.routes.js'
import categoryRoutes from './routes/categories.routes.js'
import productRoutes from './routes/products.routes.js'
import orderRoutes from './routes/order.routes.js'
import paymentRoutes from './routes/payments.routes.js'
import cartRoutes from './routes/cart.routes.js'
import reviewRoutes from './routes/reviews.routes.js'
const app = express()


//middlewares
app.use(morgan('dev'));
//esto es para que express pueda convertir los reqbody en formato json y pueda entenderlos
app.use(express.json());


// Servir archivos estáticos desde la carpeta 'public'


// Crear __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


//este middleware nos permite convertir las cookies a un objeto json
app.use(cookieParser());

//esto permite que el front con otro dominio pueda acceder al backend 
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}
));

//usando las rutas
app.use("/api",authRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",paymentRoutes);
app.use("/api",cartRoutes);
app.use("/api",reviewRoutes);
export default app;