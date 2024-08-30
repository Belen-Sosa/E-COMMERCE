import app from "./app.js";
import { connectDB } from "./db.js";

//conectamos a la base de datos 
connectDB();

app.listen(3000);
console.log('Server on Port',3000)