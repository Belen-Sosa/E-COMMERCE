import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useCategories } from "../context/CategoryContext";

function CategoriesPage(){


    const {getCategories,categories,deleteCategory}= useCategories();
    useEffect(() => {
       
    
        getCategories(); 
      }, []); 
    
      if(categories.length===0) return (<h1>no hay categorias</h1>)
  

    return(
      <>
              <Link to="/category/new">Añadir Categoria</Link>
           
        <div>{categories.map(category=>(<div key={category._id} > 
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <div>
              <button onClick={()=>{
                deleteCategory(category._id)
              }}>Eliminar</button>
              <Link to={`/categories/${category._id}`}>Editar</Link>
            </div>
        </div>))}</div>
        </>
    ) 
}

export default CategoriesPage