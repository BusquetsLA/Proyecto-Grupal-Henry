import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css';
import { NavLink } from "react-router-dom";
import Logo from "../../media/LogoEstiloPropio.png"


const NavBar = () => {
    return (
        <nav className={styles.container}>
            <img src={Logo} alt="logo" />
            <SearchBar/>
            <div className={styles.container_links}>
                <div className={styles.links}>
                <NavLink className={styles.link_text} to="/Home">Home</NavLink>
                <NavLink className={styles.link_text} to="/About">About</NavLink>
                <NavLink className={styles.link_text} to="/Shop">Shop</NavLink>
                <NavLink className={styles.link_text} to="/Help">Help</NavLink>
                </div>
                <NavLink className={styles.link_cart} to="/Cart"><button>🛒 Your Cart</button></NavLink>
            </div>
        </nav>
    )
}

export default NavBar
