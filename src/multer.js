import multer from 'multer';

// Configuración de multer
const storage = multer.memoryStorage(); // Almacenar el archivo en la memoria
export const upload = multer({ storage });
