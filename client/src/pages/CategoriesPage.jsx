import { useEffect, useState } from "react"
import { getCategoriesRequest,deleteCategoryRequest } from "../api/categories"
import { Link } from "react-router-dom";

function CategoriesPage(){

    const [categories,setCategories] = useState([]);
    useEffect(() => {
        const getData = async () => {
          try {
            const res = await getCategoriesRequest();
            setCategories(res.data);
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        };
    
        getData(); 
      }, []); 
    
     const deleteCategory = async (id)=>{
      try {
        const res=  await deleteCategoryRequest(id);
        if(res.status === 200) setCategories(categories.filter(category => category._id !== id ));
      } catch (error) {
        console.log(error)
      }
 
     }

    return(
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
    )
}

export default CategoriesPage