import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Payment from "./Payment";
import AddressForm from "./AddressForm";
import Review from "./Review";
import {
  Button,
  Grid,
  Typography,
  Box,
  Container,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";

const steps = ["Envío", "Detalle", "Pago"];
const theme = createTheme();

const Checkout = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const emptyCart = { productsList: [], totalPrice: 0 };
  const [activeStep, setActiveStep] = useState(0);
  // eslint-disable-next-line
  const [cart, setCart] = useLocalStorage("cart", emptyCart);
  const [preference, setPreference] = useState(null);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm input={input} onSubmit={handleSubmit} onChange={setInput} />;
      case 1:
        return (
          <Review
            shipping={input}
            products={cart.productsList}
            total={cart.totalPrice}
          />
        );
      case 2:
        return <Payment preference={preference} />;
      default:
        throw new Error("No se pudo encontrar este paso");
    }
  };

  useEffect(() => {
    axios(`http://localhost:3001/mercadopago/${userInfo._id}`)
      .then(({ data }) => setPreference(data))
      .catch((error) => console.error(error));
  }, [userInfo._id, setPreference]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // updateOrder(input);
  };

  if (!preference) {
    return (
      <Grid>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <Link to="/cart">Estilo Propio</Link> / Checkout
          </Typography>
        </Toolbar>
        <Button component={Link} to="/cart" size="medium" variant="contained">
          Volver
        </Button>
        <Paper style={{ height: 500 }}>
          <Typography variant="h6">
            Aguarde un momento
            <br />
            Estamos procesando su orden
          </Typography>
          <BounceLoader />
        </Paper>
      </Grid>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          <Link to="/cart">Volver al carrito</Link> / Checkout
        </Typography>
      </Toolbar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Volver
                  </Button>
                )}
                {activeStep < 2 && (
                  <Button
                    onSubmit={handleSubmit}
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "" : "Siguiente"}
                  </Button>
                )}
              </Box>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Checkout;
