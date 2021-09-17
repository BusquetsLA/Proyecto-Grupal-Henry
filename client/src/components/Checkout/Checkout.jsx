import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { getDataFromMP } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import { BounceLoader } from "react-spinners";
import Payment from "./Payment";
import styles from "./Checkout.module.css";

/*
Agregar dispatch para cambiar el status de la order a "processing"
Agregar dispatch para volver al carrito y setear el status de la orden en "created"
*/

const Checkout = () => {
  const dispatch = useDispatch();

  const emptyCart = { productsList: [], totalPrice: 0 };

  const userInfo = useSelector((state) => state.userInfo);
  const preference = useSelector((state) => state.user.preference);
  // eslint-disable-next-line
  const [cart, setCart] = useLocalStorage("cart", emptyCart);

  useEffect(() => {
    dispatch(getDataFromMP(userInfo._id));
  }, [dispatch, userInfo._id]);

  if (!preference || !Object.keys(preference).length) {
    return (
      <Grid container>
        <Button component={Link} to="/cart" size="medium" variant="contained">
          Volver
        </Button>
        <BounceLoader />
        <Typography>Cargando...</Typography>
      </Grid>
    );
  }

  return (
    <Grid>
      <Button component={Link} to="/cart" size="medium" variant="contained">
        Volver
      </Button>
      <Grid className={styles.checkout}>
        <Payment
          data={preference}
          productsList={cart.productsList}
          totalPrice={cart.totalPrice}
        />
      </Grid>
    </Grid>
  );
};

export default Checkout;
