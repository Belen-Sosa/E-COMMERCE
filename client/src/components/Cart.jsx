import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import ItemCart from './ItemCart';


import { Link } from 'react-router-dom';


const Cart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [productsLength, setProductLength] = useState(0);
  const { cartItems,getProductsCart } = useContext(CartContext);

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      setProductLength(cartItems.reduce((previous, current) => previous + current.quantity, 0));
    }
  }, [cartItems]);

  const total = Array.isArray(cartItems)
    ? cartItems.reduce((previous, current) => previous + current.quantity * current.price, 0)
    : 0;
    useEffect(() => {
      if (!cartItems.length) {
        getProductsCart(); // Llamar a getProductsCart cuando se monta el carrito si no hay productos
      }
    }, [cartItems.length]); 
 

  return (
    <div>
      <div onClick={() => setCartOpen(!cartOpen)}>
        {!cartOpen ? <p>carrito cerrado</p> : <p>carrito abierto</p>}
      </div>

      {!cartOpen && <div>{productsLength}</div>}

      {cartItems && cartOpen && (
        <div>
          <h2>tu carrito</h2>
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <div>
              {cartItems.map((item, i) => (
                <ItemCart key={i} item={item} />
              ))}
            </div>
          )}

          <h2>Total: ${total}</h2>
        </div>
      )}

<Link to={'/order'}>Continuar compra</Link>

     
    </div>
  );
};

export default Cart;