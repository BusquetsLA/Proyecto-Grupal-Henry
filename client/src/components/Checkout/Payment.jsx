import React, { useEffect,useState } from "react";
import utils from "../../redux/utils/index";
import {
  Container,
  List,
  ListItem,
  Typography,
  ListItemText,
  Paper,
} from "@material-ui/core";
import styles from "./Checkout.module.css";


import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';



  // lat: -24.1867288,
  // lng: -65.3042418



const Payment = ({ productsList, totalPrice, data }) => {

  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  const [ selected, setSelected ] = useState({});
  
  const onSelect = item => {
    setSelected(item);
  }



  const locations = [
    {
      name: "Local 1 - Monteagudo 1157",
      location: { 
        lat: 41.3954,
        lng: 2.162 
      },
    },
    {
      name: "Local 2 Alvear 600",
      location: { 
        lat: 41.3917,
        lng: 2.1649
      },
    },
    {
      name: "Local 3 Belgrano 800",
      location: { 
        lat: 41.3773,
        lng: 2.1585
      },
    },
    {
      name: "Local 4 Senador Perez 500",
      location: { 
        lat: 41.3797,
        lng: 2.1682
      },
    },
    {
      name: "Local 5 Patricias Argentinas 800",
      location: { 
        lat: 41.4055,
        lng: 2.1915
      },
    }
  ];








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
    <div className={styles.container}>
      <Paper className={styles.paper} elevation={3}>
        <Typography align="center" variant="h5" gutterBottom>
          Checkout
        </Typography>
        <Typography>ELIGE SUCURSAL PARA RETIRAR LA ORDEN</Typography>

      {/*  */}
     
          {/* apiKey={"AIzaSyDPCmEyEe31kXF_UNulYe5gs-aW0A3xGKo"} */}
          <LoadScript
       googleMapsApiKey="AIzaSyDPCmEyEe31kXF_UNulYe5gs-aW0A3xGKo">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
        {
            locations.map(item => {
              return (
              <Marker 
               icon={{url:'https://img.icons8.com/plasticine/1x/truck.png'}}
               
               key={item.name}
               position={item.location}
               onClick={() => onSelect(item)}
               />
              )
            })
         }

         {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name}</p>
              
            </InfoWindow>
            )
         }



        </GoogleMap>
     </LoadScript>
          
      
        
      

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
        <form id="payment-form" method="GET" />
      </Paper>
    </div>
  );
};

export  default Payment;

