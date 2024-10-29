import { useEffect, useState } from "react";
import { getOrdersRequest } from "../api/order";
import { Link } from "react-router-dom";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const getData = async () => {
    try {
      const res = await getOrdersRequest();
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   
    getData();
    console.log(orders);
  }, []);
  return (
    <>
      <h1>Mis Compras:</h1>

      <div>
        {orders.map((order) => (
          <div key={order._id}>
            <p>orden: {order.totalAmount}</p>
            <p>Productos:</p>
             <div>
             {order.items.map((item) => (
                <div key={item._id}>
                <p>Item:{item.productId.name}</p>
                <p>cantidad:{item.quantity}</p>
              
                <img
                 
                  src={`http://localhost:3000${item.productId.images[0]}`}
                  alt={item.productId._id}
                  style={{ width: "200px", height: "200px" }} // Ajusta el tamaño según sea necesario
                />
             
                </div>
             ))}
             </div>
             <Link to={'/order/detail'}>VER COMPRA</Link>
            
          </div>
        ))}


      </div>
    </>
  );
}

export default OrderPage;
