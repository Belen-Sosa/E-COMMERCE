import { useEffect, useState } from "react"
import { getProductRequest,deleteProductRequest } from "../api/products"
import { Link } from "react-router-dom";

function ProductsPage(){

    const [products,setProducts] = useState([]);
  
    useEffect(() => {
        const getData = async () => {
          try {
            const res = await getProductRequest();
            setProducts(res.data);
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        };
    
        getData(); 
      }, []); 
    
     const deleteProduct = async (id)=>{
      try {
        const res=  await deleteProductRequest(id);
        if(res.status === 200) setProducts(products.filter(product => product._id !== id ));
      } catch (error) {
        console.log(error)
      }
 
     }

    return(
      <>
              <Link to="/products/new">Añadir Producto</Link>
           
        <div>{products.map(product=>(<div key={product._id} > 
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div>
              <button onClick={()=>{
                deleteProduct(product._id)
              }}>Eliminar</button>
              <Link to={`/products/${product._id}`}>Editar</Link>
            </div>
        </div>))}</div>
        </>
    ) 
}

export default ProductsPage