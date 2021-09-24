import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import utils from "../../redux/utils/index";
import { concatCarts } from "../../utils/index";
import { getProducts, updateUserCart } from "../../redux/actions/index";
import { makeStyles } from "@material-ui/core/styles";
import BeatLoader from "react-spinners/BeatLoader";
import {
  Container,
  Grid,
  Card,
  Button,
  Typography,
  CardContent,
  ButtonGroup,
  ButtonBase,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const Cart = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const allProducts = useSelector((state) => state.products.all);
  const userInfo = useSelector((state) => state.userInfo);

  const emptyCart = { productsList: [], totalPrice: 0 };
  const [cart, setCart] = useLocalStorage("cart", emptyCart);
  const [loading, setLoading] = useState(false);
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:3001/user/${userInfo._id}`
        );
        const cartModified = data.cart.map((elem) => ({
          ...elem,
          price: elem.price.$numberDecimal,
        }));
        updateUserCart(userInfo._id, cartModified).then(() => {
          setLoading(false);
          setUserCart(cartModified);
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (userInfo) {
      fetchData();
    }
  }, []);

  const totalPrice = cart
    ? cart.productsList.reduce((acc, cur) => {
        acc += cur.price * cur.quantity;
        return utils.roundNumber(acc);
      }, 0)
    : 0;

  useEffect(() => {
    if (!allProducts.length) {
      dispatch(getProducts());
    }
  }, [dispatch, allProducts.length]);

  useEffect(() => {
    if (userInfo && cart.productsList.length === 1) {
      updateUserCart(userInfo._id, cart.productsList);
    }
  }, [userInfo, cart]);

  useEffect(() => {
    if (userInfo && userCart.length) {
      const allCarts = concatCarts(userCart, cart.productsList);
      setCart({
        ...cart,
        productsList: allCarts,
      });
      updateUserCart(userInfo._id, allCarts);
    }
  }, [userInfo, userCart]);

  // Handlers
  const handleUpdateQuantity = async (option) => {
    if (userInfo) {
      setCart({
        ...cart,
        productsList: utils.updateQuantity(cart.productsList, option),
      });
      await updateUserCart(userInfo._id, cart.productsList);
    } else {
      setCart({
        ...cart,
        productsList: utils.updateQuantity(cart.productsList, option),
      });
    }
  };

  const handleRemoveProduct = async (e, id) => {
    e.preventDefault()
    if (userInfo) {
      const cartUpdated = cart.productsList.filter((elem) => elem._id !== id)
      setCart({
        ...cart,
        productsList: cartUpdated,
        totalPrice: totalPrice,
      })
      await updateUserCart(userInfo._id, cartUpdated)
    } else {
      setCart({
        ...cart,
        productsList: cart.productsList.filter((elem) => elem._id !== id),
        totalPrice: totalPrice,
      });
    }
  };

  const handleRemoveAll = async () => {
    if (userInfo) {
      setCart(emptyCart);
      await updateUserCart(userInfo._id, []);
    } else {
      setCart(emptyCart);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setCart({
      ...cart,
      totalPrice: totalPrice,
    });
    await updateUserCart(userInfo._id, userCart);
    return history.push("/checkout");
  };

  const listProducts = cart.productsList.map((elem, idx) => {
    const productStock = allProducts?.find(
      (product) => product._id === elem._id
    )?.stock;
    return (
      <div key={idx} className={classes.root}>
        <Card style={{ margin: 20, padding: 20 }} variant="outlined">
          <CardContent>
            <ButtonBase component={Link} to={`/detail/${elem._id}`}>
              <img
                className={classes.img}
                src={elem.image_url}
                alt={elem.name}
                height="200"
              />
            </ButtonBase>
            <Typography gutterBottom variant="h5">
              {elem.name}
            </Typography>
            <Typography variant="body2">
              Precio: $ {utils.roundNumber(elem.price * elem.quantity)}
            </Typography>
            <Typography variant="body2">
              Stock disponible: {!productStock ? 0 : productStock}
            </Typography>
            <Typography variant="subtitle1">
              Cantidad: {elem.quantity}
            </Typography>
            <ButtonGroup disableElevation variant="contained">
              <Button
                color="primary"
                onClick={() =>
                  handleUpdateQuantity({ id: elem._id, value: "min" })
                }
                disabled={elem.quantity === 1}
              >
                -
              </Button>
              <Button
                color="primary"
                onClick={() =>
                  handleUpdateQuantity({ id: elem._id, value: "max" })
                }
                disabled={elem.quantity === productStock}
              >
                +
              </Button>
            </ButtonGroup>
          </CardContent>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => handleRemoveProduct(e, elem._id)}
          >
            Remover de la lista
          </Button>
        </Card>
      </div>
    );
  });

  if (!listProducts || !listProducts.length) {
    return (
      <Container style={{ margin: 50 }}>
        <Paper>
          <Typography variant="h4">
            <b>Tu carrito está vacío.</b>
            <br />
            Vuelve a la tienda y agrega los productos que desees comprar.
          </Typography>
          <Button
            component={Link}
            to="/shop"
            style={{ margin: 50 }}
            variant="contained"
            color="secondary"
          >
            VOLVER A LA TIENDA
          </Button>
        </Paper>
      </Container>
    );
  }

  if (loading) {
    return <BeatLoader />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid>
        <Button component={Link} to="/shop" variant="contained" color="primary">
          Agrega otro producto
        </Button>
     
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
          {!userInfo ? (
            <Container>
              <Typography>
                Debes estar registrado para poder continuar con la compra
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                style={{ margin: 30 }}
              >
                Registrate
              </Button>
            </Container>
          ) : (
            listProducts.length && (
              <Container>
                <Button
                  variant="contained"
                  style={{ margin: 30 }}
                  color="primary"
                  onClick={(e) => handleCheckout(e)}
                >
                  COMPRAR
                </Button>
              </Container>
            )
          )}
        </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cart;
