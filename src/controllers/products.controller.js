import Product from '../models/product.model.js'
import Category from '../models/category.model.js'

export const getProducts = async ( req, res)=> {

    const products= await Product.find();
    res.json(products);
}


export const createProduct = async (req, res) => {
    try {
        
      const { name, description, price, category, stock, images } = req.body;
  
      // Verificar que la categoría exista
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: "La categoría no existe." });
      }
  
      // Crear un nuevo producto
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        stock: stock || 0,  // Si no se proporciona stock, el valor por defecto será 0
        images: images || [] // Si no se proporcionan imágenes, el valor será un array vacío
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
export const updateProduct = async ( req, res)=> {
    const product= await Product.findByIdAndUpdate(req.params.id, req.bod,{
        new:true
    });
    if(!product) return res.status(404).json({message: 'Producto no encontrado.'});
    res.json(product);
}
export const deleteProduct = async ( req, res)=> {

    const product= await Category.findByIdAndDelete(req.params.id);
    if(!category) return res.status(404).json({message: 'Categoria no encontrada.'});
    res.json(category);
}