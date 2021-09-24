import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./Error404.module.css"


export default function Error404() {
    return (
        <div>
           <NavLink  className={styles.container} to="/">
           <img src="https://static.wikia.nocookie.net/politicsandwar/images/6/64/Error_404_Flag.gif"  alt="error404"/>
           <br />
           <button className={styles.boton}>Volver a la Tienda</button></NavLink>
        </div>
    )
}
