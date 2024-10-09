import axios from "./axios";

export const getProductsCartRequest = () => axios.get(`/cart`);

export const addItemToCartRequest = (product) => axios.post("/cart/add_item", product);

export const deleteItemToCartRequest = (product_id) => axios.delete(`/cart/${product_id}`);

export const updateItemToCartRequest = (product_id,query) => axios.put(`/cart/${product_id}?query=${query}`);