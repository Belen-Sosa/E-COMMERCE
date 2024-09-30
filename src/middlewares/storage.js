import multer from "multer";
import path from 'path';
import fs from 'fs';
 
const uploadsDirectory = path.resolve('public/uploads');
// Asegurarse de que el directorio de uploads existe
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory, { recursive: true }); // Crear el directorio si no existe
}

const guardar = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadsDirectory )
    },
    filename: (req,file,cb)=>{
        if(file!==null){
            const ext= file.originalname.split('.').pop()
            cb(null,Date.now()+'.'+ext)
        }
    }
})

const filtro= (req,file,cb)=>{
    if(file && (file.mimetype=== "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png")){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

export const subirImagen = multer({storage: guardar, fileFilter:filtro })