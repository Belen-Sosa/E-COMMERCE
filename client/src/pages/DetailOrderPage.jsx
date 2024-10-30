import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderRequest } from "../api/order";

const DetailOrderPage = () => {
  const params = useParams();

  const [order, setOrder] = useState([]);
  const getData = async () => {
    try {
      const res = await getOrderRequest(params.id);
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    console.log(order);
  }, []);
  return (
    <>
     
      <h1>Detalle de la compra:</h1>
      <div>

          <div key={order._id}>
            <p>orden: {order._id}</p>
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
                  <p>precio: {item.price}</p>
                  <p>subtotal: {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <p>Total final: {order.totalAmount}</p>
            
          </div>
      
      </div>
    </>
  );
};

export default DetailOrderPage;
