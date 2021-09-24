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
  users: [],
  user: {
    cart: [],
  },
  userDetail: [],
  orders: {
    orderAll:[],
    orderFiltred:[],
  },
  orderDetail: [],
  reviews:[],
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

    case types.GET_CATEGORIES_BY_NAME:
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

    case types.STATUS_CHANGE:
      return {
        ...state,
        loading: true,
      };

    case types.POST_PRODUCT:
      return {
        ...state,
      };

    case types.UPDATE_PRODUCT:
      return {
        ...state,
      };

    case types.DELETE_PRODUCT:
      return {
        ...state,
      };

    case types.POST_CATEGORY:
      return {
        ...state,
      };

    case types.DELETE_CATEGORY:
      return {
        ...state,
      };

    case types.UPDATE_CATEGORY:
      return {
        ...state,
      };

    case types.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
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

    case types.UPDATE_USER_CART:
      return {
        ...state,
        // user: {
        //   cart: action.payload
        // }
      };

    case types.GET_CART_FROM_USER:
      return {
        ...state,
        // user: {
        //   cart: action.payload ? action.payload : state.user.cart,
        // },
      };

    // Reducer de Usuarios
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case types.DELETE_USERS:
      return {
        ...state,
        loading: false,
      };

    case types.GET_USER_BY_ID:
      return {
        ...state,
        userDetail: action.payload,
        loading: false,
      };

    case types.UPDATE_USER_BY_ID:
      return {
        ...state,
        loading: false,
      };
      

// Reducer de Ordenes
  case types.GET_ORDERS:
      return {
        ...state,
        orders: {
          ...state.orders,
          orderAll: action.payload,
          orderFiltred: action.payload,
        },
        loading: false,
      };
      
  case types.GET_ORDER_BY_ID:
      return {
        ...state,
        orderDetail: action.payload,
        loading: false,
      };

  case types.FILTER_ORDERS:
       console.log(action.payload);
       const filtredOrders = state.orders.orderAll;
     return {
        ...state,
        orders: {
          ...state.orders,
          orderFiltred: action.payload==='all' ? filtredOrders : filtredOrders.filter(e => e.status===action.payload)
        },
        loading: false,
      };

  case types.UPDATE_ORDER_BY_ID:
      return {
        ...state,
        loading: false,
      };


// Reducer de Review
  case types.GET_REVIEWS:
    return {
      ...state,
      reviews: action.payload,
      loading: false,
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

    case types.SEND_HELP_EMAIL:
      return {
        ...state,
      };

    case types.SEND_REGISTER_EMAIL:
      return {
        ...state,
      };

    case types.SEND_PAYMENT_EMAIL:
      return {
        ...state,
      };


    case types.SEND_PASS_RESET_EMAIL:
      return {
        ...state,
      };

    case types.SEND_ORDER_DISPATCH_EMAIL:
      return {
        ...state,
      };

    case types.PASSWORD_FORGOT:
      return {
        ...state,
      };

    case types.PASSWORD_RESET:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default rootReducer;
