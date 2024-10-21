import { useForm } from "react-hook-form";
import { createProductRequest, updateProductRequest,getProductRequest } from "../api/products.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCategories } from "../context/CategoryContext.jsx";

function ProductFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { getCategories, categories } = useCategories();
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({}); 



  const getProduct = async (id)=> {
    try {
      const res = await getProductRequest(id);
      const product = res.data;
      setProduct(product); // Guarda el producto en el estado

      setValue("name", product.name);
        setValue("description", product.description);
        setValue("price", product.price);
        setValue("category", product.category);
        setValue("stock", product.stock);
        setValue("images", product.images);

    } catch (error) {
      console.log(error)
    }
   
  }


  useEffect(() => {
    getCategories();
    if (params.id) {
      getProduct(params.id);
    }
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    // Crear un objeto FormData para manejar datos y archivos
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("stock", data.stock);

      // Manejar las imágenes seleccionadas
  if (data.images && data.images.length > 0) {
    const filesArray = Array.from(data.images);
    filesArray.forEach((file) => {
      formData.append("imagenes", file); // Cambia el nombre aquí a 'imagenes'
    });
  }

    try {
      if (params.id) {
        // Actualizar producto
        const res = await updateProductRequest(params.id, formData);
        navigate("/products");
      } else {
        // Crear nuevo producto
        const res = await createProductRequest(formData);
        navigate("/products");
      
      }
    } catch (error) {
      console.log(error);
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
              {...register("name", { required: true })}
              autoFocus
            />
            <input
              type="text"
              placeholder="Descripción"
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("description", { required: true })}
            />
            <input
              type="decimal"
              placeholder="Precio"
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("price", { required: true })}
            />
            <select
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("category", { required: true })}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Stock"
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("stock", { required: true })}
            />

            <br />

            {/* Mostrar todas las imágenes */}
            {product.images && product.images.length > 0 && (
              <div>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3000${image}`} // Ajusta esta URL si es necesario
                    alt={product.name}
                    style={{ width: "200px", height: "200px" }} // Ajusta el tamaño según sea necesario
                  />
                ))}
              </div>
            )}
            {/* INPUT MULTIPLE IMAGES */}
            <label>
              <span>Seleccionar imágenes </span>
              <input
                type="file"
                 name="imagenes"
                {...register("images")}
                accept=".jpg,.jpeg,.png"
                multiple // Permitir la selección de varias imágenes
              />
            </label>

            <button className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductFormPage;
