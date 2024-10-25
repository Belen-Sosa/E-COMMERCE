export const validateSchema = (schema)=>(req, res, next)=>{
    try {
        schema.parse(req.body);
        console.log("Estamos en el validate")
        next();
    } catch (error) {
        
     return res.status(400).json({error: error.errors.map((error)=> error.message)})
    }

    

}