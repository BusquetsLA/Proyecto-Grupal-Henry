import React from "react";
import Carrusel from "../Carrusel/Carrusel";
import Footer from '../Footer/Footer'
import NavbarLanding from "./NavbarLanding";

const Home = () => {
  // eslint-disable-next-line
  return (
    <div>
      <NavbarLanding/>
      <Carrusel/>
      {/* <Products /> */}
      <Footer/> 
    </div>
  );
};

export default Home;
