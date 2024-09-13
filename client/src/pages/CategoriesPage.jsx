import { useEffect, useState } from "react"
import { getCategoriesRequest } from "../api/categories"

function CategoriesPage(){

    const [tasks,setTasks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await getCategoriesRequest();
            setTasks(res.data);
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData(); // Llamamos a la función async dentro de useEffect
      }, []); // Dependencias vacías para ejecutar solo una vez al montar el componente
    


    return(
        <div>{tasks.map(task=>(<div key={task._id} > 
            <h1>{task.name}</h1>
            <p>{task.description}</p>
        </div>))}</div>
    )
}

export default CategoriesPage