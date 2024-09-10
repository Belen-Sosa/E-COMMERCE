import { useEffect } from "react"
import { getCategoriesRequest } from "../api/categories"

function CategoriesPage(){
useEffect(async ()=>{
    const res = await getCategoriesRequest();
    console.log(res);
})


    return(
        <div>CategoriesPage</div>
    )
}

export default CategoriesPage