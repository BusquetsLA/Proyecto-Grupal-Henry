import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@material-ui/core";

const Review = ({ shipping, products, total }) => {
  const { firstName, lastName, address1, address2, city, country, state, zip } =
    shipping;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Productos
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.name}
              secondary={`Cantidad ${product.quantity}`}
            />
            <Typography variant="body2">$ {product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $ {total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Datos del envío
          </Typography>
          <Typography gutterBottom>
            Nombre y apellido: {`${firstName} ${lastName}`}
          </Typography>
          <Typography gutterBottom>
            Domicilio: {`${address1} ${address2}`}
          </Typography>
          <Typography gutterBottom>Localidad: {city}</Typography>
          <Typography gutterBottom>Nacionalidad: {country}</Typography>
          <Typography gutterBottom>Provincia: {state}</Typography>
          <Typography gutterBottom>Código postal: {zip}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
