import React, { useState,useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Grid, Typography, TextField, Select, MenuItem, InputLabel } from "@material-ui/core";

const AddressForm = ({ input, onSubmit, onChange }) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [selected, setSelected] = useState({});
  const [ currentPosition, setCurrentPosition ] = useState({});


  let [envio, setEnvio] = useState(1)

  const handleChange = (event) => {
    setEnvio(event.target.value)
    
  }

  const locations = [
    {
      name: "Local 1 - Belgrano 563",
      location: { lat: -24.185260353028028, lng: -65.30216629608282 },
    },
    {
      name: "Local 2 Alte. Brown 664",
      location:{lat: -24.197146584406003, lng: -65.28763105026243},
    },
    {
      name: "Local 3 Libertad 556",
      location: {lat: -24.18709306463862, lng: -65.31681348434446},
    },
    {
      name: "Local 4 Senador Perez 500",
      location: { lat: 41.3797, lng: 2.1682 },
    },
  
  ];

  const mapStyles = { height: "40vh", width: "70%" };
  const defaultCenter = { lat: -24.18622471059911, lng: -65.29928256622313 };

  const onSelect = (item) => {
    
    setSelected(item);

    console.log({selected})
  };

  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })
 
  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng})
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
        {/* <Grid item xs={12}>
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
        </Grid> */}
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
        
        <Grid item xs={12} sm={6}>
        <Select
         value={envio}
         onChange={handleChange}>

           <MenuItem value={1}>Retiro por Sucursal</MenuItem>
           <MenuItem value={2}>Envio a Domicilio</MenuItem>
         </Select>
         </Grid> 
        
    

        {envio==1 ? (<Grid item xs={12} sm={40}>
        <Typography>ELIGE SUCURSAL PARA RETIRAR LA ORDEN</Typography>
        {/* "AIzaSyDPCmEyEe31kXF_UNulYe5gs-aW0A3xGKo" */}
        
          <LoadScript googleMapsApiKey="AIzaSyDPCmEyEe31kXF_UNulYe5gs-aW0A3xGKo">
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={defaultCenter}
            >
              {locations.map((item) => (
                <Marker
                  // icon={{
                  //   url: "https://img.icons8.com/plasticine/1x/truck.png",
                  // }}
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
          
        </Grid>):
        
        

        (<Grid item xs={12} sm={40}>
        <Typography>MARQUE EN EL MAPA LA UBICACION EXACTA</Typography>
        <LoadScript googleMapsApiKey="AIzaSyDPCmEyEe31kXF_UNulYe5gs-aW0A3xGKo">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={18}
          center={currentPosition}>
          {
            currentPosition.lat ?
            ( 
              <Marker position={currentPosition}
              onDragEnd={(e) => onMarkerDragEnd(e)}
              draggable={true}/>
            ) :null
          }
          {console.log(currentPosition)}
          </GoogleMap>
       </LoadScript>

        </Grid>)
        }
        
      </Grid>
    </>
  );
};

export default AddressForm;
