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
    const { files } = req; // 'files' contendrá un array de las imágenes subidas

    // Verificar que la categoría exista
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "La categoría no existe." });
    }

    // Validar imágenes y limpiar archivos no válidos
    const imageUrls = []; // Array para almacenar las rutas de las imágenes válidas

    if (files && files.length > 0) {
      for (const file of files) {
        if (!file.mimetype.match(/image\/(jpg|jpeg|png)/)) {
          return res.status(400).json({
            message: "Formato de imagen no válido. Solo se aceptan .jpg o .png",
          });
        }
        // Agregar la ruta de la imagen válida al array
        imageUrls.push('/uploads/' + file.filename);
      }
    } else {
      return res.status(400).json({
        message: "No se subieron imágenes. Por favor, seleccione al menos una imagen.",
      });
    }

    // Crear un nuevo producto
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock: stock || 0,
      images: imageUrls, // Almacenar el array de rutas de imágenes
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
    const { files } = req; // 'files' contendrá un array de las imágenes subidas

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

    // Validar y manejar imágenes subidas
    const imageUrls = []; // Array para almacenar las rutas de las imágenes válidas

    if (files && files.length > 0) {
      // Eliminar imágenes antiguas antes de agregar nuevas
      const oldImages = product.images; // Almacena las rutas de las imágenes antiguas
      for (const oldImage of oldImages) {
        const oldImagePath = path.join(path.resolve('public/uploads'), oldImage.split('/uploads/')[1]);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Eliminar la imagen anterior
        }
      }

      // Validar imágenes y agregar nuevas rutas
      for (const file of files) {
        if (!file.mimetype.match(/image\/(jpg|jpeg|png)/)) {
          return res.status(400).json({
            message: "Formato de imagen no válido. Solo se aceptan .jpg o .png",
          });
        }
        // Agregar la ruta de la imagen válida al array
        imageUrls.push('/uploads/' + file.filename);
      }
    }

    // Actualiza las imágenes del producto
    product.images = imageUrls; // Almacenar el array de rutas de imágenes

    // Guardar el producto actualizado en la base de datos
    const updatedProduct = await product.save();

    // Responder con el producto actualizado
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async ( req, res)=> {

    const product= await Product.findByIdAndDelete(req.params.id);
    if(!product) return res.status(404).json({message: 'Producto no encontrado.'});
    res.json(product);
}