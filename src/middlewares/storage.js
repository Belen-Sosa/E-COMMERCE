import multer from "multer";
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
 
const uploadsDirectory = path.resolve('public/uploads');

// Asegurarse de que el directorio de uploads existe
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory, { recursive: true }); // Crear el directorio si no existe
}

// Configuración de almacenamiento de multer
const guardar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDirectory);
    },
    filename: (req, file, cb) => {
        if (file !== null) {
            const ext = file.originalname.split('.').pop();
            cb(null, `${uuidv4()}.${ext}`);  // Usa un UUID para asegurar un nombre único
        }
    }
});

// Filtro para aceptar solo imágenes
const filtro = (req, file, cb) => {
    if (file && (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png")) {
        cb(null, true);  // Aceptar la imagen
    } else {
        cb(null, false);  // Rechazar archivos que no sean imágenes
    }
}

// Configuración de multer para manejar múltiples archivos
export const subirImagenes = multer({
    storage: guardar,
    fileFilter: filtro
}).array('imagenes', 10);  // Aquí 'imagenes' es el nombre del campo y 10 es el máximo de imágenes que se pueden subir a la vez
