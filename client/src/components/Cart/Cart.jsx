import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import utils from "../../redux/utils/index";
import BeatLoader from "react-spinners/BeatLoader";
import {
  Container,
  Grid,
  Card,
  Button,
  Typography,
  CardContent,
  ButtonGroup,
} from "@material-ui/core";

const Cart = () => {
  const [cart, setCart] = useLocalStorage("cart", {
    productsList: [],
    totalPrice: 0,
  });

  const totalPrice = cart
    ? cart.productsList.reduce((acc, cur) => {
        acc += cur.price * cur.quantity;
        return utils.roundNumber(acc);
      }, 0)
    : 0;

  const handleUpdateQuantity = (option) => {
    setCart({
      ...cart,
      productsList: utils.updateQuantity(cart.productsList, option),
    });
  };

  const handleRemoveProduct = (id) => {
    setCart({
      ...cart,
      productsList: cart.productsList.filter((elem) => elem._id !== id),
      totalPrice: totalPrice,
    });
  };

  const handleRemoveAll = () => {
    setCart({
      productsList: [],
      totalPrice: 0,
    });
  };

  const handleCheckout = () => {
    setCart({
      ...cart,
      totalPrice: totalPrice,
    });
  };

  const listProducts = cart.productsList.map((elem, idx) => (
    <Card key={idx} style={{ margin: 20, padding: 20 }} variant="outlined">
      <CardContent>
        <img src={elem.image_url} alt={elem.name} width="200" height="200" />
        <Typography variant="h5" component="h2">
          {elem.name}
        </Typography>
        <Typography variant="body2">
          Precio: $ {utils.roundNumber(elem.price * elem.quantity)}
        </Typography>
        <Typography>Cantidad: {elem.quantity}</Typography>
        <ButtonGroup disableElevation variant="contained">
          <Button
            color="primary"
            onClick={() => handleUpdateQuantity({ id: elem._id, value: "min" })}
          >
            -
          </Button>
          <Button
            color="primary"
            onClick={() => handleUpdateQuantity({ id: elem._id, value: "max" })}
          >
            +
          </Button>
        </ButtonGroup>
      </CardContent>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleRemoveProduct(elem._id)}
      >
        Remove
      </Button>
    </Card>
  ));

  if (!listProducts) {
    return <BeatLoader />;
  }

  if (!listProducts.length) {
    return (
      <Container style={{ margin: 50 }}>
        <Typography variant="h4">
          <b>Tu carrito está vacío.</b>
          <br />
          Vuelve a la tienda y agrega los productos que desees comprar.
        </Typography>
        <Link to="/">
          <Button style={{ margin: 50 }} variant="contained" color="secondary">
            VOLVER A LA TIENDA
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Grid container justifyContent="center">
      <Link to="/">
        <Button variant="contained" color="primary">
          Volver
        </Button>
      </Link>
      <Grid item style={{ margin: 20 }}>
        <Typography>Precio total: $ {totalPrice}</Typography>
        <Button
          variant="contained"
          style={{ margin: 30 }}
          color="primary"
          onClick={() => handleRemoveAll()}
        >
          VACIAR CARRITO
        </Button>
        {listProducts}
        <Grid item>
          {listProducts.length && (
            <Link to="/checkout">
              <Button
                variant="contained"
                style={{ margin: 30 }}
                color="primary"
                onClick={() => handleCheckout()}
              >
                COMPRAR
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cart;
