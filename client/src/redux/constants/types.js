// Products
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME";
const GET_PRODUCTS_BY_ID = "GET_PRODUCTS_BY_ID";
const POST_PRODUCT = "POST_PRODUCT";

// Categories
const GET_CATEGORIES = "GET_CATEGORIES";
const GET_CATEGORY_DETAILS = "GET_CATEGORY_DETAILS";
const POST_CATEGORY = "POST_CATEGORY";

// Cart
const CART_ADD_PRODUCT = "CART_ADD_PRODUCT";
const CART_REMOVE_PRODUCT = "CART_REMOVE_PRODUCT";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const UPDATE_TOTAL_PRICE = "UPDATE_TOTAL_PRICE";

// Filter
const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
const FILTER_BY_PRICE_RANGE = "FILTER_BY_PRICE_RANGE";

// Order
const ORDER_BY_PRICE = "ORDER_BY_PRICE";

const TYPES = {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_NAME,
  GET_PRODUCTS_BY_ID,
  POST_PRODUCT,
  POST_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY_DETAILS,
  ORDER_BY_PRICE,
  FILTER_BY_CATEGORY,
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
  UPDATE_QUANTITY,
  UPDATE_TOTAL_PRICE,
  FILTER_BY_PRICE_RANGE,
};

export default TYPES;
