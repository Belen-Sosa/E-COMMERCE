import axios from "./axios";


export const createOrder = (order) => axios.post("/orders", order);