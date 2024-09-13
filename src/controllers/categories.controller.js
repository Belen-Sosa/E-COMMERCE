import Category from '../models/category.model.js'

export const getCategories = async ( req, res)=> {
    try {
        const categories= await Category.find();
        res.json(categories);
    } catch (error) {
        return res.status(500).json({message: "Algo salio mal."})
    }

}
export const createCategory = async ( req, res)=> {

    try {
        const {name, description}= req.body;

        const newCategory = new Category({
            name,
            description
        });
    
        const savedCategory=  await newCategory.save();
        res.json(savedCategory);
    } catch (error) {
        return res.status(500).json({message: "Algo salio mal."})
    }
   

}

export const getCategory = async ( req, res)=> {
    try {
        const category= await Category.findById(req.params.id);
        if(!category) return res.status(404).json({message: 'Categoria no encontrada.'});
        res.json(category);
    } catch (error) {
        return res.status(404).json({message: "Categoria no encontrada"})
    }
  

}
export const updateCategory = async ( req, res)=> {
    try {
        const category= await Category.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        });
        if(!category) return res.status(404).json({message: 'Categoria no encontrada.'});
        res.json(category);
    
    } catch (error) {
        return res.status(404).json({message: "Categoria no encontrada"})
    }
}
export const deleteCategory = async ( req, res)=> {
    try {
        const category= await Category.findByIdAndDelete(req.params.id);
        if(!category) return res.status(404).json({message: 'Categoria no encontrada.'});
        res.json(category);
    } catch (error) {
        return res.status(404).json({message: "Categoria no encontrada"})
    }
   
}