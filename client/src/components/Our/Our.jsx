import React from 'react'
import styles from "./Our.module.css";
import { NavLink } from "react-router-dom";

const Our = () => {
    return (
        <div className={styles.fondo}>
        <h1>NUESTRA HISTORIA</h1>
        <p> Nuestra empresa fue fundada con animo de crecimiento, e ir mas alla de lo comun, buscamos agradar a nuestros clientes con productos de excelente calidad y diferentes, con nosotros podras encontrar un detalle para agradar a tus seres queridos en cualquier momento o un lindo mueble para ubicar en tu hogar. 
        </p>
        <NavLink to="/">
        <h2 className={styles.home}>Home</h2>
      </NavLink>
        </div>
    )
}

export default Our
    