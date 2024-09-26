import { useForm } from "react-hook-form";

import {
  createProductRequest,
  getProductRequest,
  updateProductRequest,
} from "../api/products.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCategories } from "../context/CategoryContext.jsx";

function ProductFormPage() {
  const { register, handleSubmit } = useForm();

  //context de categories
  const { getCategories, categories } = useCategories();
  console.log(categories);

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    getCategories();
    getProduct(params.id);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      try {
        try {
          const res = await updateProductRequest(params.id, data);
          navigate("/products");
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await createProductRequest(data);
        navigate("/products");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  });



  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("name")}
              autoFocus
            />
            <input
              type="text"
              placeholder="Descripción"
              className=" mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("description")}
            />
            <input
              type="number"
              placeholder="Precio"
              className=" mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("price")}
            />

            <select               className=" mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}  {...register("category")}>
                  {category.name}
                </option>
              ))
            }
             
            </select>

            <input
              type="number"
              placeholder="Stock"
              className=" mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("stock")}
            />

            <br></br>
            {/* INPUT IMAGES */}
            <label >
              <span>Seleccionar archivos </span>
              <input type="file" multiple onChange={changeInput}   ></input>
            </label>



            <button className="  mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductFormPage;
