import { useForm } from "react-hook-form"

import {createCategoryRequest,getCategoryRequest, updateCategoryRequest} from '../api/categories.js'
import { useNavigate,useParams } from "react-router-dom";
import { useEffect } from "react";

function CategoryFormPage(){

    const {register, handleSubmit,setValue} = useForm();

    const navigate = useNavigate();

    const params = useParams();

    const getCategory = async (id)=> {
      try {
        const res = await getCategoryRequest(id);
        const category = res.data;

        setValue('name', category.name);
        setValue('description',category.description);

      } catch (error) {
        console.log(error)
      }
     
    }

 

    useEffect(()=>{
     
      getCategory(params.id);
    
      
    },[])

    const onSubmit = handleSubmit(async (data)=>{

     if(params.id){
      try {
        try {
          const res=  await updateCategoryRequest(params.id, data)
          navigate("/categories")
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error)
      }
      
     }else{
      try {
        const res=  await createCategoryRequest(data);
        navigate("/categories")
        console.log(res);
      } catch (error) {
        console.log(error)
      }
     }
     
    })

    return(
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Nombre"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register("name")}
            autoFocus
            
            />
            <input type="text" placeholder="Descripción"
              className=" mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register("description")}/>
           
            
            <button
              className="  mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Guardar</button>
        </form>
        </div>
        </div>
        </>
    )
}

export default CategoryFormPage