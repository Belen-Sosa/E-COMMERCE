import axios from "./axios";

export const getOrdersRequest = () => axios.get(`/orders`);