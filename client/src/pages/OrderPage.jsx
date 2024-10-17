import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useContext, useState } from "react";
import { createOrder } from "../../../src/controllers/orders.controllers";
import { CartContext } from "../context/CartContext";
initMercadoPago("YOUR_PUBLIC_KEY", {
  locale: "es-AR",
});

function OrderPage() {
  const { cartItems } = useContext(CartContext);
  const [preferenceId, setPreferenceId] = useState(null); // Guarda el preferenceId para usar en Wallet
  const buy_products = async () => {
    try {
      const response = await createOrder(cartItems);
      const preference = await response.json();

      // Guarda el preferenceId para montar el Wallet
      setPreferenceId(preference._id);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCheckoutButton = () => {
    if (preferenceId) {
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
    <div>
      {/* Muestra el botón de Mercado Pago cuando se tiene un preferenceId */}
   
      <button onClick={buy_products}>CONTINUAR COMPRA</button>

      <div id="wallet_container">{renderCheckoutButton()}</div>
    </div>
  );
}

export default OrderPage;
