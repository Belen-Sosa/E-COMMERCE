import Cart from '../models/cart.model.js'
import Product from '../models/product.model.js';



//ver este 
export const  getCart = async ( req, res)=> {

    try {
        let cart = await Cart.findOne({ userId: req.user.id })
        .populate('items.productId', 'name');
        if (!cart) {
           
            cart = new Cart({
                userId: req.user.id,
                items: [],
                totalAmount: 0
            });

            await cart.save(); // Guarda el carrito nuevo en la base de datos
        }
       
 
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito.', error });
    }
  

}

export const deleteProductCart = async ( req, res)=> {

    try {
        // Encuentra el carrito del usuario
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado.' });

        // Encuentra el índice del producto que quieres eliminar
        const productIndex = cart.items.findIndex(item => item.productId.toString() === req.params.product_id);
        if (productIndex === -1) return res.status(404).json({ message: 'Producto no encontrado en el carrito.' });

       
        // Elimina el producto del array
        cart.items.splice(productIndex, 1);

         // Recalcular el totalAmount sumando los subtotales de todos los productos
         cart.totalAmount = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

        // Guarda los cambios en el carrito
        await cart.save();

        res.json({ message: 'Producto eliminado del carrito con éxito.', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto del carrito.', error });
    }
}


export const addItemToCart = async (req, res) => {


    const {  productId, quantity ,image} = req.body;
    console.log(req.body);
    console.log(req.user)
  
    try {
        // Buscar el producto por su ID
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado.' });

        const price = product.price;
        const subtotal = quantity * price;

        
        // Buscar el carrito del usuario
        let cart = await Cart.findOne({userId:req.user.id} );

        if (!cart) {
            // Si no existe el carrito lo crea
            cart = new Cart({
                userId:req.user.id,
                items: [{ productId, quantity, price, subtotal,image }],
                totalAmount: subtotal
            });
        } else {
            // Si el carrito existe, verificar si el producto ya está en el carrito
            const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (existingItemIndex > -1) {
                // Si ya existe, actualizar la cantidad y el subtotal
                cart.items[existingItemIndex].quantity += quantity;
                cart.items[existingItemIndex].subtotal = cart.items[existingItemIndex].quantity * cart.items[existingItemIndex].price;
            } else {
                // Si no existe, agregar el nuevo producto al carrito
                cart.items.push({ productId, quantity, price, subtotal,image});
            }

            // Recalcular el totalAmount sumando los subtotales de todos los productos
            cart.totalAmount = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
        }

        // Guardar o actualizar el carrito
        const updatedCart = await cart.save();
        res.json(updatedCart);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el producto al carrito.' });
    }
};

export const putProductCart = async (req, res) => {
    const { product_id } = req.params; // Extraemos correctamente de req.params
    const query = req.query.query; // Corrige la extracción de la query
    console.log(query)
    
    try {
      // Buscar el carrito del usuario
      let cart = await Cart.findOne({ userId: req.user.id });
  
      // Si el carrito no existe, devolver un error
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado.' });
      }
      console.log('Carrito encontrado:', cart);
  
      // Encontrar el producto en el carrito
      const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === product_id);
      console.log("existingItemIndex",existingItemIndex)
      console.log("product_id",product_id)
      // Si no se pasa ninguna query, devolvemos un error
      if (!query) {
        return res.status(400).json({ message: 'Debes enviar una query ("add" o "del").' });
      }
  
      // Si el producto está en el carrito y la query es "add"
      if (existingItemIndex !== -1 && query === "add") {
        console.log("estamos en add")
        cart.items[existingItemIndex].quantity += 1; // Aumentamos la cantidad del producto
        // Actualizamos el subtotal del producto
        cart.items[existingItemIndex].subtotal = cart.items[existingItemIndex].quantity * cart.items[existingItemIndex].price;
      } 
      // Si el producto está en el carrito y la query es "del"
      else if (existingItemIndex !== -1 && query === "del") {
        console.log("estamos en dell")
        if (cart.items[existingItemIndex].quantity > 1) {
          cart.items[existingItemIndex].quantity -= 1; // Reducimos la cantidad
          // Actualizamos el subtotal del producto
          cart.items[existingItemIndex].subtotal = cart.items[existingItemIndex].quantity * cart.items[existingItemIndex].price;
        } else {
          cart.items.splice(existingItemIndex, 1); // Eliminamos el producto si la cantidad es 1
        }
      } else {
        return res.status(400).json({ message: 'Producto no encontrado en el carrito o query no válida.' });
      }
  
      // Recalcular el totalAmount sumando los subtotales de todos los productos
      cart.totalAmount = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
  
      // Guardamos el carrito actualizado
      await cart.save();
  
      // Devolvemos la respuesta
      res.json({
        message: 'El carrito fue actualizado correctamente.',
        cart,
      });
    } catch (error) {
      console.error('Error al actualizar el carrito:', error);
      res.status(500).json({ message: 'Error al actualizar el carrito.' });
    }
  };
