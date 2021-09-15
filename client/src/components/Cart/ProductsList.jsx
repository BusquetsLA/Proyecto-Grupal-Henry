import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  ButtonBase,
  Typography,
  ButtonGroup,
  Button,
} from "@material-ui/core";

const ProductsList = ({ productsList }) => {
  return productsList?.map((elem, idx) => (
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
          <Typography variant="subtitle1">Cantidad: {elem.quantity}</Typography>
          <ButtonGroup disableElevation variant="contained">
            <Button
              color="primary"
              onClick={() =>
                handleUpdateQuantity({ id: elem._id, value: "min" })
              }
            >
              -
            </Button>
            <Button
              color="primary"
              onClick={() =>
                handleUpdateQuantity({ id: elem._id, value: "max" })
              }
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
          Remover de la lista
        </Button>
      </Card>
    </div>
  ));
};

export default ProductsList;
