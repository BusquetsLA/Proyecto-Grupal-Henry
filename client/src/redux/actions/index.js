import { Category } from "@material-ui/icons";
import axios from "axios";
import types from "../constants/types";
const BASE_URL = "http://localhost:3001";

// http://localhost:3001/products GET
// http://localhost:3001/products?name=... GET
// http://localhost:3001/products/id GET
// http://localhost:3001/categories GET
// http://localhost:3001/products/addProducts POST

// Products
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products`);
      return dispatch({
        type: types.GET_PRODUCTS,
        payload: data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: types.GET_PRODUCTS,
        payload: [],
      });
    }
  };
};

export const getProductsByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products?name=${name}`);
      return dispatch({
        type: types.GET_PRODUCTS_BY_NAME,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductsById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products/${id}`);
      return dispatch({
        type: types.GET_PRODUCTS_BY_ID,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_URL}/products/addProducts`, product);
      return dispatch({
        type: types.POST_PRODUCT,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      await axios.put(`${BASE_URL}/products/update/`, product);
      return dispatch({
        type: types.UPDATE_PRODUCT,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProduct = (productID) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}/products/delete/${productID}`);
      return dispatch({
        type: types.DELETE_PRODUCT,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// Categories
export const getCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/categories`);
      return dispatch({
        type: types.GET_CATEGORIES,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCategoryDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/categories/detail/${id}`);
      return dispatch({
        type: types.GET_CATEGORY_DETAILS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addCategory = (category) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_URL}/categories/create`, category);
      return dispatch({
        type: types.POST_CATEGORY,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCategory = (categoryID) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}/categories/delete/${categoryID}`);
      return dispatch({
        type: types.DELETE_CATEGORY,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCategory = (category) => {
  return async (dispatch) => {
    try {
      await axios.put(`${BASE_URL}/categories/update/`, category);
      return dispatch({
        type: types.UPDATE_CATEGORY,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// Filter
export const filterByCategory = (id) => (dispatch) => {
  return dispatch({
    type: types.FILTER_BY_CATEGORY,
    payload: id,
  });
};

// Order
export const orderByPrice = (payload) => {
  return {
    type: types.ORDER_BY_PRICE,
    payload,
  };
};

export const orderByRangePrice = (payload) => {
  return {
    type: types.FILTER_BY_PRICE_RANGE,
    payload,
  };
};

// Email
export const sendHelpEmail = (email) => { // correo de sugerencias o consultas
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_URL}/sendHelpEmail`, email);
      return dispatch({
        type: types.SEND_HELP_EMAIL, // va de ellos a nosotros
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendRegisterEmail = (email) => { // correo de confirmacion de registro
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_URL}/sendRegisterEmail`, email);
      return dispatch({
        type: types.SEND_REGISTER_EMAIL, // va de nosotros a ellos
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendPaymentEmail = (email) => { // correo de confirmación de la compra
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_URL}/sendPaymentEmail`, email);
      return dispatch({
        type: types.SEND_PAYMENT_EMAIL, // va de nosotros a ellos
      });
    } catch (error) {
      console.log(error);
    }
  };
};
