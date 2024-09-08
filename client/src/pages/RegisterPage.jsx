import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function RegisterPage(){

    const {register,handleSubmit, formState: {errors}}= useForm();
    const {signup,isAuthenticated,errors:registerErrors} = useAuth();
    const navigate = useNavigate()

    useEffect(()=>{
        if(isAuthenticated) navigate("/")
    },[isAuthenticated])

    const onSubmit=   handleSubmit(async (values)=>{
        signup(values);
    
    })

    return (
        
    <>

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    {registerErrors && registerErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white mb-2">
              {error}
            </div>
          ))}
       
        <form onSubmit={onSubmit} className="space-y-6">
        <div>
      
            <label htmlFor="usuario" className="block text-sm font-medium leading-6 text-gray-900">
            Nombre de Usuario
            </label>
            <div className="mt-2">
            <input
                type="text" {...register("username",{required:true})} 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.username && <p className="text-red-500">Debe ingresar un nombre de usuario </p>}
            </div>
        </div>
        <div>
            <label htmlFor="usuario" className="block text-sm font-medium leading-6 text-gray-900">
            Correo Electronico
            </label>
            <div className="mt-2">
            <input
                type="email" {...register("email",{required:true})} 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
                {errors.email && <p className="text-red-500">Debe ingresar un correo electronico </p>}
            </div>
        </div>

        <div>
            <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Contraseña
            </label>
            <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
                </a>
            </div>
            </div>
            <div className="mt-2">
            <input
                
                type="password"
                {...register("password",{required:true})} 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
              {errors.email && <p className="text-red-500">Debe ingresar una contraseña </p>}
            </div>
        </div>

        <div>
            <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Registrarse
            </button>
        </div>
        </form>

    
    </div>
    </div>
</>
        
    )
}

export default RegisterPage;