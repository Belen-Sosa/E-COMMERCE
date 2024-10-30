import axios from "./axios";

export const getOrdersRequest = () => axios.get(`/orders`);
export const getOrderRequest = (id) => axios.get(`/orders/${id}`);
