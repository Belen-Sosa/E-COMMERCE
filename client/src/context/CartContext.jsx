import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      //para que no se pierdan los productos cada vez que recargamos la pagina
      const productInLocalStorage = localStorage.getItem("cartProducts");
      return productInLocalStorage ? JSON.parse(productInLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));


    console.log(cartItems)
  }, [cartItems]);

  const addItemToCart = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart === product._id
    );

    if (inCart) {
      setCartItems(
        cartItems.map((productInCart) => {
          if (productInCart._id === product._id) {
            return { ...inCart, quantity: inCart.quantity + 1 };
          } else return productInCart;
        })
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

 const  deleteItemToCart = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart === product._id
    );

    if (inCart.quantity === 1) {
      setCartItems(
        cartItems.filter((productInCart) => productInCart._id !== product._id)
      );
    } else {
      setCartItems((productInCart) => {
        if (productInCart._id === product._id) {
          return { ...inCart, quantity: inCart.quantity - 1 };
        } else return productInCart;
      });
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, deleteItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
