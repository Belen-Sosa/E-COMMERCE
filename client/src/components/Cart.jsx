import {useContext, useEffect, useState} from 'react'
import { CartContext } from '../context/CartContext'
import ItemCart from './ItemCart'
const Cart = ()=>{
    const [cartOpen,setCartOpen]= useState(false)
    const [productsLength, setProductLength] = useState(0)
    const {cartItems} = useContext(CartContext);

    useEffect(() => {
        if (Array.isArray(cartItems)) {
            setProductLength(cartItems.reduce((previous, current) => previous + current.quantity, 0));
        }
    }, [cartItems]);
    
    const total = Array.isArray(cartItems)
        ? cartItems.reduce((previous, current) => previous + current.quantity * current.price, 0)
        : 0;
    return(
        <div>Cart
            <div onClick={()=> setCartOpen(!cartOpen)}>
                {
                    !cartOpen? (
                        <p>carrito cerrado</p>
                    ):(
                        <p>carrito abierto</p>
                    )

                }

                
            </div>
            {!cartOpen && (<div>
                {productsLength}
            </div>)}


            {cartItems && cartOpen &&(
                <div >
                    <h2> tu carrito</h2>
                    {cartItems.length ===0 ? <p>Tu carrito esta vacio</p>:
                    (
                        <div>
                            {cartItems.map((item,i)=>(
                                <ItemCart key={i} item={item} />
                            ))}
                        </div>
                    )}

                    <h2>Total : ${total}</h2>

                </div>
            )}
        </div>
    )
}

export default Cart