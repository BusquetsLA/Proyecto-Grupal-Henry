import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Grid, Typography, TextField } from "@material-ui/core";

const AddressForm = ({ input, onSubmit, onChange }) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [selected, setSelected] = useState({});

  const locations = [
    {
      name: "Local 1 - Monteagudo 1157",
      location: { lat: 41.3954, lng: 2.162 },
    },
    {
      name: "Local 2 Alvear 600",
      location: { lat: 41.3917, lng: 2.1649 },
    },
    {
      name: "Local 3 Belgrano 800",
      location: { lat: 41.3773, lng: 2.1585 },
    },
    {
      name: "Local 4 Senador Perez 500",
      location: { lat: 41.3797, lng: 2.1682 },
    },
    {
      name: "Local 5 Patricias Argentinas 800",
      location: { lat: 41.4055, lng: 2.1915 },
    },
  ];

  const mapStyles = { height: "100vh", width: "100%" };
  const defaultCenter = { lat: 41.3851, lng: 2.1734 };

  const onSelect = (item) => {
    setSelected(item);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    onChange({ ...input, [name]: value });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Información de envío
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            type="text"
            autoComplete="given-name"
            variant="standard"
            value={input.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            type="text"
            autoComplete="family-name"
            variant="standard"
            value={input.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            type="text"
            autoComplete="shipping address-line1"
            variant="standard"
            value={input.address1}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            type="text"
            autoComplete="shipping address-line2"
            variant="standard"
            value={input.address2}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            type="text"
            autoComplete="shipping address-level2"
            variant="standard"
            value={input.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            type="text"
            variant="standard"
            value={input.state}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            type="number"
            autoComplete="shipping postal-code"
            variant="standard"
            value={input.zip}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            type="text"
            autoComplete="shipping country"
            variant="standard"
            value={input.country}
            onChange={handleInputChange}
          />
        </Grid>
        <Typography>ELIGE SUCURSAL PARA RETIRAR LA ORDEN</Typography>
        <Grid container>
          <LoadScript googleMapsApiKey="AIzaSyDPCmEyEe31kXF_UNulYe5gs-aW0A3xGKo">
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={defaultCenter}
            >
              {locations.map((item) => (
                <Marker
                  icon={{
                    url: "https://img.icons8.com/plasticine/1x/truck.png",
                  }}
                  key={item.name}
                  position={item.location}
                  onClick={() => onSelect(item)}
                />
              ))}

              {selected.location && (
                <InfoWindow
                  position={selected.location}
                  clickable={true}
                  onCloseClick={() => setSelected({})}
                >
                  <p>{selected.name}</p>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;
