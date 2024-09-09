import axios from "axios";

const instance = axios.create({
    //esto nos permite poner cual es el dominio base al que siempre va a consultar
    baseURL:'http://localhost:3000/api',
    withCredentials: true

})

export default instance