import { useEffect, useState } from "react";
import { getOrdersRequest } from "../api/order";
import { Link } from "react-router-dom";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getOrdersRequest();
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
   
    getData();

  }, []);
  console.log(orders)

  return (
    <>
      <h1>Mis Compras:</h1>

      <div>
        {orders.length > 0 && orders.map((order) => (
          <div key={order._id}>
            <p>orden: {order._id}</p>
            <p>Productos:</p>
             <div>
             {order.items.map((item) => (
                <div>
   
                <div>
                <p>Item: {item.productId?.name || "Nombre no disponible"}</p>
                <p>cantidad:{item.quantity}</p>
              
                {item.productId?.images && item.productId.images.length > 0 && (
        <img
          src={`http://localhost:3000${item.productId.images[0]}`}
          alt={item.productId._id || "Imagen no disponible"}
          style={{ width: "200px", height: "200px" }}
        />
      )}
                </div>
          
                <p>cantidad:{item.quantity}</p>
              
             
                </div>
             ))}
             </div>
             <Link to={`/order/detail/${order._id}`}>VER COMPRA</Link>
            
          </div>
        ))}


      </div>
    </>
  );
}

export default OrderPage;
