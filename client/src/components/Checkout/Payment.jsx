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

export default Payment;
