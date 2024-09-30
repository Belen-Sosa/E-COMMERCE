import Product from '../models/product.model.js'
import Category from '../models/category.model.js'
import path from 'path';
import fs from 'fs';


export const getProducts = async ( req, res)=> {

 

    try {
      const products= await Product.find();
      res.json(products);
  } catch (error) {
      return res.status(500).json({message: "Algo salio mal."})
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const image = req.file; // Asumiendo que estás usando `multer`

    // Verificar que la categoría exista
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "La categoría no existe." });
    }

    // Validar si la imagen es válida
    if (image && !image.mimetype.match(/image\/(jpg|jpeg|png)/)) {
      const uploadsDirectory = path.resolve('public/uploads');
      const filePath = path.join(uploadsDirectory, image.filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Eliminar la imagen si no es válida
      }

      return res.status(400).json({
        message: "Formato de imagen no válido. Solo se aceptan .jpg o .png",
      });
    }

    // Crear un nuevo producto
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock: stock || 0,
      image: image ? '/uploads/' + image.filename : "", // Asegurarte que la ruta de la imagen sea correcta
    });

    // Guardar el producto en la base de datos
    const savedProduct = await newProduct.save();

    // Responder con el producto guardado
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async ( req, res)=> {

    const product= await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message: 'Producto no encontrado.'});
    res.json(product);

}

export const updateProduct = async (req, res) => {
  try {
      const { name, description, price, category, stock } = req.body;
      const image = req.file; // La nueva imagen que se sube

      // Buscar el producto actual
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Producto no encontrado.' });

      // Verificar y actualizar los campos solo si se proporciona un nuevo valor
      if (name) product.name = name;
      if (description) product.description = description;
      if (price) product.price = price;
      if (category) {
          const categoryExists = await Category.findById(category);
          if (!categoryExists) {
              return res.status(400).json({ message: "La categoría no existe." });
          }
          product.category = category;
      }
      if (stock !== undefined) product.stock = stock; // Permite que el stock se mantenga igual si no se proporciona

      // Validar si se proporciona una nueva imagen
      if (image) {
          if (!image.mimetype.match(/image\/(jpg|jpeg|png)/)) {
              const uploadsDirectory = path.resolve('public/uploads');
              const filePath = path.join(uploadsDirectory, image.filename);

              if (fs.existsSync(filePath)) {
                  fs.unlinkSync(filePath); // Eliminar la imagen si no es válida
              }

              return res.status(400).json({
                  message: "Formato de imagen no válido. Solo se aceptan .jpg o .png",
              });
          }

          // Si hay una nueva imagen, elimina la imagen antigua
          const oldImagePath = path.join(path.resolve('public/uploads'), product.image.split('/uploads/')[1]);
          if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath); // Eliminar la imagen anterior
          }

          // Actualiza la ruta de la imagen en el producto
          product.image = '/uploads/' + image.filename;
      }

      // Guardar el producto actualizado en la base de datos
      const updatedProduct = await product.save();

      // Responder con el producto actualizado
      res.json(updatedProduct);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async ( req, res)=> {

    const product= await Category.findByIdAndDelete(req.params.id);
    if(!category) return res.status(404).json({message: 'Categoria no encontrada.'});
    res.json(category);
}