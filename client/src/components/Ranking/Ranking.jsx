import React from "react";
import {Typography, Rating, Box}  from "@mui/material";

const Ranking = () => {


    let value=2.5;
    return (
    <div>
 {/* <Typography component="legend">Controlled</Typography>       
<Rating
  name="hover-feedback"
  value={value}
  precision={0.5}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
  onChangeActive={(event, newHover) => {
    setHover(newHover);
  }}

/>
{value !== null && (
  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
)} */}
    </div>
  );
};

export default Ranking;
