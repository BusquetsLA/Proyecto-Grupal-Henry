import types from "../constants/types";
import utils from "../utils/index";
import * as userTypes from "../constants/userConstants";

const initialState = {
  products: {
    all: [], // todos los products cargados de getProducts
    filtered: [],
    searchResults: [],
  },
  productDetails: [],
  categories: [],
  categoryDetails: [],
  loading: false,
  dataState: "all",
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  signinError: "",
  signupError: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        dataState: "all",
        products: {
          ...state.products,
          all: action.payload,
        },
      };

    case types.GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        dataState: "search",
        products: {
          ...state.products,
          searchResults: action.payload,
        },
      };

    case types.GET_PRODUCTS_BY_ID:
      return {
        ...state,
        productDetails: action.payload,
      };

    case types.POST_PRODUCT:
      return {
        ...state,
      };

    case types.POST_CATEGORY:
      return {
        ...state,
      };

    case types.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case types.GET_CATEGORY_DETAILS:
      return {
        ...state,
        categoryDetails: action.payload,
      };

    case types.ORDER_BY_PRICE:
      return {
        ...state,
        products: {
          ...state.products,
          all: utils.orderPrice(state.products.all, action.payload),
          searchResults: utils.orderPrice(
            state.products.searchResults,
            action.payload
          ),
          filtered: utils.orderPrice(state.products.filtered, action.payload),
        },
      };

    case types.FILTER_BY_CATEGORY:
      return {
        ...state,
        dataState: "filter",
        products: {
          ...state.products,
          filtered: utils.filterByCategory(state, action.payload),
        },
      };

    case types.FILTER_BY_PRICE_RANGE:
      return {
        ...state,
        dataState: utils.filterByCategoryState(action.payload),
        products: {
          ...state.products,
          filtered: utils.filterByPriceRange(
            state.products.all,
            action.payload
          ),
        },
      };

    // eslint-disable-next-line no-fallthrough
    case userTypes.USER_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case userTypes.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };

    case userTypes.USER_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        signinError: action.payload,
      };

    case userTypes.USER_SIGNOUT:
      return {
        ...state,
        userInfo: null,
      };

    case userTypes.USER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case userTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };

    case userTypes.USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        signupError: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
