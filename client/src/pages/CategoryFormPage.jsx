import { useForm } from "react-hook-form"

import {createCategoryRequest} from '../api/categories.js'

function CategoryFormPage(){

    const {register, handleSubmit} = useForm();

    const onSubmit = handleSubmit(async (categorie)=>{
       const res=  await createCategoryRequest(categorie);
       console.log(res);
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