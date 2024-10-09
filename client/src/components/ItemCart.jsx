import { useContext } from "react";
import { CartContext } from "../context/CartContext";

 const ItemCart = ({item})=>{
     const {deleteItemToCart,addItemToCart}= useContext(CartContext);
     const {id} = item;
    return (
        <div> <img
       
        src={`http://localhost:3000${item.image}`}
        alt={item.name}
        style={{ width: "50", height: "50px" }} // Ajusta el tamaño según sea necesario
      />
      <div>
        <p>{item.name}</p> <p>{item.quantity}</p>
        <div>
            <button onClick={()=>addItemToCart(item)}>
                AGREGAR
            </button>
            <button onClick={()=> deleteItemToCart(item)}>SACAR</button>
        </div>
      </div>
      <div>
        {item.quantity* item.price}
      </div>
      
      
      </div>
    )

}
export default ItemCart;