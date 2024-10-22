import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useContext, useEffect, useState } from "react";

import { CartContext } from "../context/CartContext";
import { createOrder } from "../api/order";

initMercadoPago("your acces token", {
  locale: "es-AR",
});

function OrderPage() {
  const {cartData,editItemToCart,getDataCart } = useContext(CartContext);
  console.log("cartData",cartData)

  const [preferenceId, setPreferenceId] = useState(null); // Guarda el preferenceId para usar en Wallet
  const buy_products = async () => {
    try {
      const response = await createOrder(cartData);
      console.log("response",response)
      const preference = await response.data;

      // Guarda el preferenceId para montar el Wallet
      setPreferenceId(preference._id);
    } catch (error) {
      console.log(error);
    }
  };
  



  const renderCheckoutButton = () => {
    if (preferenceId) {
      if (window.checkoutButton)  window.checkoutButton.unmout();
      return (


        <Wallet
          initialization={{ preferenceId: preferenceId }}
          customization={{
            texts: { valueProp: "Paga de forma segura con Mercado Pago" },
          }}
        />
      );
    
  }
    return null;
  };
  return (
    <>

<div>
          {cartData.items.map((product) => (
            <div key={product._id}>
              <h1>nombre: {product.productId.name}</h1>

              <p>precio: {product.price}</p>
              <p>cantidad: {product.quantity}</p>
              <p>subtotal:{product.subtotal}</p>
            
    
             {/* Mostrar todas las imágenes */}
             <div>
              
                <img
              
                  src={`http://localhost:3000${product.image}`}
                  alt={product.name}
                  style={{ width: "200px", height: "200px" }} // Ajusta el tamaño según sea necesario
                />
            
            </div>
              <div>


              <button onClick={()=>editItemToCart(product.productId._id,"add",product.quantity)}>
                AGREGAR
            </button>
            <button onClick={()=> editItemToCart(product.productId._id,"del",product.quantity)}>SACAR</button>
              </div>
            </div>
          ))}

        <p>Total : $ {cartData.totalAmount}</p>
        </div>



      {/* Muestra el botón de Mercado Pago cuando se tiene un preferenceId */}
   
      <button onClick={buy_products}>CONTINUAR COMPRA</button>

      <div id="wallet_container">{renderCheckoutButton()}</div>
    </>
  );
}

export default OrderPage;
