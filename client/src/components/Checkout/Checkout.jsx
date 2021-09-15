import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { getCartFromUser } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import BounceLoader from "react-spinners";
import Payment from "./Payment";
import styles from "./Checkout.module.css";

/*
Agregar dispatch para cambiar el status de la order a "processing"
Agregar dispatch para volver al carrito y setear el status de la orden en "created"
*/

const Checkout = () => {
  const dispatch = useDispatch();

  const emptyCart = {
    productsList: [],
    totalPrice: 0,
  };

  const userInfo = useSelector((state) => state.userInfo);
  const userCart = useSelector((state) => state.user.cart);
  // eslint-disable-next-line
  const [cart, setCart] = useLocalStorage("cart", emptyCart);
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(getCartFromUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  useEffect(() => {
    axios
      .post(`http://localhost:3001/mercadopago/${userInfo._id}/${userCart}`)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, [userInfo._id, userCart]);

  if (!data || !cart || !cart.productsList || !cart.productsList.length) {
    return (
      <Container>
        <BounceLoader />
        <Typography>Cargando...</Typography>
      </Container>
    );
  }

  return (
    <Grid>
      <Button component={Link} to="/cart" size="medium" variant="contained">
        Volver
      </Button>
      <Grid className={styles.checkout}>
        <Payment
          data={data}
          productsList={cart.productsList}
          totalPrice={cart.totalPrice}
        />
      </Grid>
    </Grid>
  );
};

export default Checkout;
