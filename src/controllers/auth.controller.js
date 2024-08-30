import User from "../models/user.model.js";

export const register =async (req, res)=>{

   try {
        const {email,password,username}= req.body;
        const newUser= new User({
            username,
            email,
            password
        });

        //guardar nuevo usuario
       const userSaved= await newUser.save();
        res.json(userSaved)
     

   } catch (error) {
    console.log(error);
    
   }
}

export const login = (req, res)=>{
    
}