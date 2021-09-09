import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Shop.module.css';

const Shop = () => {
    return (
        <div>
            <NavLink
              className={styles.link_text}
              to="/"
            >
              Inicio
            </NavLink>
        </div>
    )
}

export default Shop
