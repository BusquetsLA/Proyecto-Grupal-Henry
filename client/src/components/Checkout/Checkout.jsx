import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import BounceLoader from "react-spinners";
import Payment from "./Payment";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const emptyCart = {
    productsList: [],
    totalPrice: 0,
  };
  // eslint-disable-next-line
  const [cart, setCart] = useLocalStorage("cart", emptyCart);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3001/mercadopago")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

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
