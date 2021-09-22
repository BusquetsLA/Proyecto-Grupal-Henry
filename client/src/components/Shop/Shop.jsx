import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Shop.module.css';
import Products from "../Products/Products";
import NavBar from "../NavBar/NavBar";

const Shop = () => {
  const [order, setOrder] = React.useState("");
  console.log('order:',order)
    return (
        <div>
            <NavBar setOrder={setOrder} />
            <Products />
        </div>
    )
}

export default Shop
