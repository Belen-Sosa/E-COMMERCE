import { createContext, useEffect, useState } from "react";

import {
  addItemToCartRequest,
  deleteItemToCartRequest,
  getProductsCartRequest,
  updateItemToCartRequest,
} from "../api/cart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({ items: [], totalAmount: 0 });
  const getProductsCart = async () => {
    try {
      const res = await getProductsCartRequest();
     
      setCartData(res.data);
      setCartItems(res.data.items || []); // Establece un array vacío por defecto si `items` es null o undefined
    } catch (error) {
      console.log(error);
      setCartItems([]); // En caso de error, inicializa el carrito como un array vacío
    }
  };



  useEffect(() => {
    getProductsCart();
 
    
  }, []);

  const addItemToCart = async (product) => {

    const { _id, images } = product;

    try {
      const res = await addItemToCartRequest({
        productId: _id,
        quantity: 1,
        image: images[0] ? images[0] : "",
      });

      getProductsCart();
    } catch (error) {
      console.log(error);
    }
  };

  const editItemToCart = async (product_id, query, quantity) => {
    if (query === "del" && quantity === 1) {
      try {
        const res = await deleteItemToCartRequest(product_id);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await updateItemToCartRequest(product_id, query);
      } catch (error) {
        console.log(error);
      }
    }

    getProductsCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, cartData,addItemToCart, editItemToCart ,getProductsCart}}>
      {children}
    </CartContext.Provider>
  );
};
