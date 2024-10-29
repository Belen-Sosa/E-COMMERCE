
import { useContext, useEffect, useState } from "react";

import { CartContext } from "../context/CartContext";
import { createPreference } from "../api/mercadoPago";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


function OrderPage() {
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;

  //inicializar mp
initMercadoPago(publicKey,{
  locale:"es-AR",
});
  const {cartData,editItemToCart,getDataCart } = useContext(CartContext);
  console.log("cartData",cartData)

  const [preferenceId, setPreferenceId] = useState(null); // Guarda el preferenceId para usar en Wallet
  const creatingPreference = async () => {
    try {
      const response = await createPreference(cartData);

  

      const {id} = response.data;
      return id;


    } catch (error) {
      console.log(error);
    }
  };
  const handleBuy = async ()=>{
    const id = await creatingPreference();
    console.log("id aca en handle buyy", id)
    if(id){
      setPreferenceId(id)
    }
  }



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
             {!preferenceId && <div>


             <button onClick={()=>editItemToCart(product.productId._id,"add",product.quantity)}>
                AGREGAR
            </button>
            <button onClick={()=> editItemToCart(product.productId._id,"del",product.quantity)}>SACAR</button>
             
              </div>}
            </div>
          ))}

        <p>Total : $ {cartData.totalAmount}</p>
        </div>




      <button onClick={handleBuy}>Terminar compra</button>
      
 {/* boton de pago de mp */}
{ preferenceId && <Wallet initialization={{ preferenceId: preferenceId }}  />}



    </>
  );
}

export default OrderPage;
