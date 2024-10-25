import { useLocation } from "react-router-dom";


function PaymentPage(){

    const location = useLocation();
    const { preference } = location.state || {};  // Acceder al state que fue pasado con navigate()
    console.log(preference)
    return(<>
    {preference && <p>Preference ID: {preference._id}</p>}
    {preference.items.map((product) => (
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
              
            </div>
          ))}

    </>)
}

export default PaymentPage;