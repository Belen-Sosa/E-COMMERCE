import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
  const { email, password, username } = req.body;
  //encriptando contraseña

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    //guardar nuevo usuario
    const userSaved = await newUser.save();
   //creando jwt
    const token = await createAccessToken({id:userSaved._id})
    
    //establecer el token en una cookie
    res.cookie('token',token);


   
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {};
