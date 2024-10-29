import axios from "./axios";


export const createPreference = (order) => axios.post("/preference", order);