const orderPrice = (arr, option) => {
  switch (option) {
    case "price_asc":
      return arr.sort((a, b) => a.price - b.price);

    case "price_desc":
      return arr.sort((a, b) => b.price - a.price);

    default:
      return arr;
  }
};

const filterByPriceRange = (state, range) => {
  const [min, max] = range.split("-");
  return state.filter(({ price }) => price >= min && price <= max);
};

const filterByCategory = (state, option) => {
  const allProducts = state.products.all;
  const filtered = state.categories?.find((elem) => elem._id === option);
  return option === "all_categories" ? allProducts : filtered?.products.filter(product => product.stock>0);
};

const filterByCategoryState = (option) => {
  return option === "all_categories" ? "all" : "filter";
};

const addProductToCart = (state, id) => {
  const product = state.products.all.find((elem) => elem._id === id);
  if (product && state.cart.listProducts?.find((elem) => elem._id === id)) {
    return state.cart.listProducts;
  } else if (product) {
    product.quantity = 1;
    return [...state.cart.listProducts, product];
  }
};

const updateQuantity = (state, { id, value }) => {
  switch (value) {
    case "min":
      return state.map((elem) => {
        if (id === elem._id) {
          if (elem.quantity > 1) elem.quantity--;
        }
        return elem;
      });

    case "max":
      return state.map((elem) => {
        if (id === elem._id) elem.quantity++;
        return elem;
      });

    default:
      return state;
  }
};

const roundNumber = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

const utils = {
  orderPrice,
  filterByCategory,
  filterByPriceRange,
  filterByCategoryState,
  addProductToCart,
  updateQuantity,
  roundNumber,
};

export default utils;
