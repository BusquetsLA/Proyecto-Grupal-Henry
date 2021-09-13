import React, { useEffect } from "react";
import utils from "../../redux/utils/index";
import {
  Container,
  List,
  ListItem,
  Typography,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { BounceLoader } from "react-spinners";
import styles from "./Checkout.module.css";

const Payment = ({ productsList, totalPrice, data }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    const attr_data_preference = document.createAttribute("data-preference-id");
    attr_data_preference.value = data.id;
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);
    document.getElementById("form1").appendChild(script);
  }, [data]);

  if (!productsList || !totalPrice || !data) {
    return (
      <Container>
        <BounceLoader />
        <Typography>Cargando...</Typography>
      </Container>
    );
  }

  return (
    <div className={styles.container}>
      <Paper className={styles.paper} elevation={3}>
        <Typography align="center" variant="h5" gutterBottom>
          Checkout
        </Typography>
        <Container>
          <List>
            {productsList.map((elem, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={elem.name}
                  secondary={`Cantidad: ${elem.quantity}`}
                />
                <Typography variant="body2">
                  $ {utils.roundNumber(elem.price * elem.quantity)}
                </Typography>
              </ListItem>
            ))}
            <ListItem>
              <ListItemText primary="Precio Total" />
              <Typography variant="body2">$ {totalPrice}</Typography>
            </ListItem>
          </List>
        </Container>
        <form id="form1" method="GET" />
      </Paper>
    </div>
  );
};

export default Payment;
