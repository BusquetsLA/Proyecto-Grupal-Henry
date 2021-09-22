import React from 'react'
import styles from "./NavbarLanding.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../media/LogoEstiloPropio.png";
   
    
    const NavbarLanding = () => {
 
      return (
        <nav>
          <div className={styles.container}>
            <img src={Logo} alt="logo" />
            <p className={styles.title}>Bienvenidos a Estilo Propio</p>  
            <div className={styles.container_links}>
              <div className={styles.links}>
                <NavLink
                  className={styles.link_text}
                  to="/"
                >
                  Inicio
                </NavLink>
                <NavLink className={styles.link_text} to="/shop">
                  Tienda
                </NavLink>
                <NavLink className={styles.link_text} to="/about">
                  Nosotros
                </NavLink>
                <NavLink className={styles.link_text} to="/help">
                  Ayuda
                </NavLink>
              </div>
            
            </div>
          </div>
        </nav>
      );
    };
    
export default NavbarLanding
