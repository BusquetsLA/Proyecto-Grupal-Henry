import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";


const Payment = ({ preference }) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttribute("data-preference-id", preference.id);
    const form = document.getElementById("payment-form");
    form.appendChild(script);
  }, [preference]);

  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Haga click en "Pagar" para continuar con la compra
      </Typography>
      <Typography variant="body1" gutterBottom>
        Será redireccionado para proceder con el pago
      </Typography>
      <Grid container spacing={3}>
        <Grid container justifyContent="center">
          <form id="payment-form" method="GET" />
        </Grid>
      </Grid>
    </>
  );
};

export  default Payment;
