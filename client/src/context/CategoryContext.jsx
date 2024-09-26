import { createContext, useContext, useState } from "react";
import { deleteCategoryRequest, getCategoriesRequest } from "../api/categories";

const CategoryContext = createContext();


export const useCategories = () =>{
    const context = useContext(CategoryContext);

    if(!context){
        throw new Error("useCategories  deberia estar dentro de un provider.")
    }

    return context;
}

export function CategoryProvider({children}){

    const [categories,setCategories]= useState([])

    const getCategories = async () =>{
       try {
            const res = await getCategoriesRequest();
            setCategories(res.data)

       } catch (error) {
        console.log(error)
       }
    }

    const deleteCategory = async (id)=>{
        try {
          const res=  await deleteCategoryRequest(id);
          if(res.status === 200) setCategories( categories.filter((category)=> category._id != id));
        } catch (error) {
          console.log(error)
        }
   
       }

    return (
        <CategoryContext.Provider value={{
            categories,
            getCategories,
            deleteCategory,
        }}>
            {children}
        </CategoryContext.Provider>
    )
}