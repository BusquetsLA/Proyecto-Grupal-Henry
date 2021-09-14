import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

  const userInfo = useSelector((state) => state.userInfo);
  // eslint-disable-next-line
  const [cart, setCart] = useLocalStorage("cart", emptyCart);
  const [data, setData] = useState({});
  const [order, setOrder] = useState("")

  //OrderId
  const getOrderId = async (userId) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/user/${userId}`)
      const order = data.orders.find((elem) => elem.status === "created")
      return order._id
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userInfo._id) {
      axios
        .get(`http://localhost:3001/order/${userInfo._id}/`)
        .then((response) => setOrder(response.status))
        .catch((error) => console.log(error));
    }
  }, [userInfo]);

  useEffect(() => {
    axios
      .post(`http://localhost:3001/mercadopago/${userInfo._id}/${order._id}`)
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
