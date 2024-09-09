import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
  const { email, password, username ,address} = req.body;
 

  try {
    //hacemos la validacion de el usuario primero

    const userFound= await User.findOne({email});
    if(userFound) return res.status(400).json( ["El correo ya existe."])

     //encriptando contraseña

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role: 'customer',
      addresses: [address]

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
      addresses: userSaved.addresses,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};



export const login = async (req, res) => {
    const { email, password } = req.body;

  
    try {
        const userFound = await User.findOne({email});

        if(!userFound) return res.status(400).json({error:["Usuario no encontrado"]});

      //comparamos contraseña
  
     const isMatch = await bcrypt.compare(password, userFound.password);

     if(!isMatch){
        return res.status(400).json({
           error:["Contraseña o correo incorrecto"]
        })
     }

     //creando jwt
      const token = await createAccessToken({id:userFound._id})
      
      //establecer el token en una cookie
      res.cookie('token',token);
  
      res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
      });
    } catch (error) {
      res.status(500).json({message: error.message});
    }
};


export const logout = (req,res)=>{
    res.cookie('token',"",{
        expires:new Date(0)
    })

    return res.sendStatus(200);

}


export const profile = async (req, res)=>{

  const userFound= await  User.findById(req.user.id);

  if(!userFound){
    return res.status(400).json({message: "Usuario no encontrado"});

  }

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updateAt,
  })
     
}