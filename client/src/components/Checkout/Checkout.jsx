import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Grid, Typography } from "@material-ui/core";
import { BounceLoader } from "react-spinners";
import Payment from "./Payment";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const dispatch = useDispatch();

  const emptyCart = { productsList: [], totalPrice: 0 };

  const userInfo = useSelector((state) => state.userInfo);
  // eslint-disable-next-line
  const [cart, setCart] = useLocalStorage("cart", emptyCart);
  const [preference, setPreference] = useState(null);
  console.log("Preference en componente Checkout", preference);

  useEffect(() => {
    axios(`http://localhost:3001/mercadopago/${userInfo._id}`)
      .then(({ data }) => setPreference(data))
      .catch((error) => console.error(error));
  }, [dispatch, userInfo._id]);

  if (!preference) {
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
          preference={preference}
          productsList={cart.productsList}
          totalPrice={cart.totalPrice}
        />
      </Grid>
    </Grid>
  );
};

export default Checkout;
