import { useEffect, useState } from "react"
import { getProductsRequest,deleteProductRequest } from "../api/products"
import { Link } from "react-router-dom";
import { useCategories } from "../context/CategoryContext.jsx";

function ProductsPage(){

    const [products,setProducts] = useState([]);
    const { getCategories, categories } = useCategories();
  
    useEffect(() => {
      getCategories();
        const getData = async () => {
          try {
            const res = await getProductsRequest();
            setProducts(res.data);
            console.log(res.data);
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
     const getCategoryName = (categoryId) => {
      const category = categories.find((cat) => cat._id === categoryId);
      return category ? category.name : "Categoría no encontrada";
    };

     return (
      <>
        <Link to="/products/new">Añadir Producto</Link>
    
        <div>
          {products.map((product) => (
            <div key={product._id}>
              <h1>nombre: {product.name}</h1>
              <p>descripcion: {product.description}</p>
              <p>precio: {product.price}</p>
              <p>categoria: {getCategoryName(product.category)}</p>
              <p>stock: {product.stock}</p>
    
             {/* Mostrar todas las imágenes */}
             <div>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000${image}`}
                  alt={product.name}
                  style={{ width: "200px", height: "200px" }} // Ajusta el tamaño según sea necesario
                />
              ))}
            </div>
              <div>
                <button
                  onClick={() => {
                    deleteProduct(product._id);
                  }}
                >
                  Eliminar
                </button>
                <Link to={`/products/${product._id}`}>Editar</Link>
              </div>
            </div>
          ))}
        </div>
      </>
    );
    
}

export default ProductsPage