import mongoose from "mongoose";

// función para conectar a la base de datos
export const connectDB = async () => {
    try {
   
        await mongoose.connect('mongodb://127.0.0.1:27017/db_ecm');
        console.log("db is connected");
    } catch (error) { 
         console.error("Error connecting to the database:", error.message || error);
    }
};