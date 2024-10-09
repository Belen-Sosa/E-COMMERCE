import { useContext } from "react";
import { CartContext } from "../context/CartContext";

 const ItemCart = ({item})=>{
     const {editItemToCart} = useContext(CartContext);
  
     const {quantity}= item;
    return (
        <div> <img
       
        src={`http://localhost:3000${item.image}`}
        alt={item.name}
        style={{ width: "50", height: "50px" }} // Ajusta el tamaño según sea necesario
      />
      <div>
        <p>{item.name}</p> <p>{item.quantity}</p> <p>${item.price}</p>
        <div>
            <button onClick={()=>editItemToCart(item.productId,"add",quantity)}>
                AGREGAR
            </button>
            <button onClick={()=> editItemToCart(item.productId,"del",quantity)}>SACAR</button>
        </div>
      </div>
      <div>
        {item.quantity* item.price}
      </div>
      
      
      </div>
    )

}
export default ItemCart;