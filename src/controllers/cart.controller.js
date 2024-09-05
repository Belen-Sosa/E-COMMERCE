import Cart from '../models/cart.model.js'
import Product from '../models/product.model.js';

export const createCart = async ( req, res)=> {
    const {userId, items,totalAmount}= req.body;

    const newCart = new Cart({
        userId,
        items,
        totalAmount
    });

    const savedCart=  await newCart.save();
    res.json(savedCart);

}

export const getCart = async ( req, res)=> {

    const cart= await Cart.findById(req.params.id);
    if(!cart) return res.status(404).json({message: 'Carrito no encontrado.'});
    res.json(cart);

}
export const updateCart = async ( req, res)=> {
    const cart= await Cart.findByIdAndUpdate(req.params.id, req.body,{
        new:true
    });
    if(!cart) return res.status(404).json({message: 'Carrito no encontrado.'});
    res.json(cart);
}
export const deleteCart = async ( req, res)=> {

    const cart= await Cart.findByIdAndDelete(req.params.id);
    if(!cart) return res.status(404).json({message: 'Carrito no encontrado.'});
    res.json(cart);
}



export const addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Buscar el producto por su ID
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado.' });

        const itemTotal = product.price * quantity;

        // Buscar el carrito del usuario
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Si no existe el carrito lo crea
            cart = new Cart({
                userId,
                items: [{ productId, quantity }],
                totalAmount: itemTotal
            });
        } else {
            // Si el carrito existe, verificar si el producto ya está en el carrito
            const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (existingItemIndex > -1) {
                // Si ya existe, actualizar la cantidad
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                // Si no existe, agregar el nuevo producto al carrito
                cart.items.push({ productId, quantity });
            }

            // Actualizar el totalAmount del carrito
            cart.totalAmount += itemTotal;
        }

        // Guardar o actualizar el carrito
        const updatedCart = await cart.save();
        res.json(updatedCart);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el producto al carrito.' });
    }
};