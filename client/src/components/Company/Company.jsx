import React from 'react'
import styles from "./Company.module.css";
import { NavLink } from "react-router-dom";


const Company = () => {
    return (
        <div className={styles.fondo}>
        <h1>SOBRE NOSOTROS</h1>
        <p> Los productos de Estilo Propio han sido diseñados pensando no sólo en cómo vivimos, sino también en cómo nos sentimos. Buscamos una conexion real con cada cliente, ofreciendo productos únicos y hechos a la medida. Hoy estos productos llenan los espacios de nuestros clientes de una forma creativa y diferente. Además, están pensados para ser vistos como piezas maravillosas. Cuando las personas tienen acceso a uno de nuestros productos, pueden contemplar como el arte esta inmerso y se despierta la curiosidad de querer mas.
        </p>
        <NavLink to="/">
        <h2 className={styles.home}>Home</h2>
      </NavLink>
        </div>
    )
}

export default Company
