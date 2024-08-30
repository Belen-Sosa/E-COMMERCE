 import mongoose from "mongoose";

 const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required: true,
        //limpiar espacios de mas en el nombre
        trim: true
    },
    email:{
        type:String,
        required: true,
        trim: true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    }
 },{
    //esto hace que se guarde en la base la fecha en la que se creo el registro y la ultima fecha en la que se modifico el registro 
    timestamps:true
 })

 export default mongoose.model('User',userSchema) 