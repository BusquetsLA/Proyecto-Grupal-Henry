import React from "react";
import Logo from "../../media/LogoEstiloPropio.png"
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img src={Logo} alt="Logo" />
        <div className={styles.links}>
        <div className={styles.list}>
          <ul>Menu</ul>
            <NavLink to="/" className={styles.list}><li>Inicio</li></NavLink>
            <NavLink to="/about" className={styles.list}><li>Sobre de Nosotros</li></NavLink>
            <NavLink to="/shop" className={styles.list}><li>Tienda</li></NavLink>
            <NavLink to="/help" className={styles.list}><li>Ayuda</li></NavLink>
            <NavLink to="/login" className={styles.list}><li>Logueo</li></NavLink>
        </div>
        <div className={styles.list}>
          <ul>Empresa</ul>
            <NavLink to="/company" className={styles.list}><li>La Empresa</li></NavLink>
        </div>
        <div className={styles.list}>
          <ul>Conocenos</ul>
            <NavLink to="/team" className={styles.list}><li>El Equipo</li></NavLink>
            <NavLink to="/our" className={styles.list}><li>Nuestra Historia</li></NavLink>
        </div>
        <div className={styles.list}>
          <ul>Encuentranos</ul>
            <a className={styles.list} href="https://www.facebook.com/profile.php?id=100059985737185" target="_blank" rel="noreferrer"><li className={styles.list}>Facebook</li></a>
            <a className={styles.list} href="https://twitter.com/EstiloP123" target="_blank" rel="noreferrer"><li className={styles.list}>Twitter</li></a>
            <a className={styles.list} href="https://www.instagram.com/estilopr35/" target="_blank" rel="noreferrer"><li className={styles.list}>Instagram</li></a>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
