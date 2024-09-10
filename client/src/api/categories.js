import axios from "./axios";

export const getCategoryRequest = (id) => axios.get(`/categories/${id}`)
export const getCategoriesRequest = () => axios.get('/categories');
export const createCategoryRequest = (category) => axios.post('/categories',category)
export const updateCategoryRequest = (category) => axios.put(`/categories/${category._id}`,category)
export const deleteCategoryRequest = (category) => axios.delete(`/categories/${category._id}`)



