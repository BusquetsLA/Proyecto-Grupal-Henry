export const concatCarts = (userCart, localCart) => {
  const allCarts = [...userCart, ...localCart];
  return allCarts.reduce((acc, elem) => {
    if (!acc.find(({ _id }) => _id === elem._id)) {
      acc.push(elem);
    }
    return acc;
  }, []);
};
