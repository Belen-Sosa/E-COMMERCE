import Product from '../models/product.model.js'

export const getProducts = async ( req, res)=> {

    const products= await Product.find();
    res.json(products);
}

//tarea
export const createProduct = async ( req, res)=> {
    const {name, description}= req.body;

    const newCategory = new Category({
        name,
        description
    });

    const savedCategory=  await newCategory.save();
    res.json(savedCategory);

}

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