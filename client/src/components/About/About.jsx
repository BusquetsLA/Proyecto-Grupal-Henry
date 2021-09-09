import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./About.module.css"


const About = () => {
    return (
        <div className={styles.container}>
            <div className={styles.target}>
            <h2>Mision</h2>
            <p>Estamos comprometidos con ser un comercio con productos unicos y diferentes, al alcance de todo tipo de clientes, brindando una experiencia de compra inigualable y una atención al cliente excepcional.</p>
            </div>
            <div className={styles.target}>
            <h2>Vision</h2>
            <p>Deseamos posicionarnos en los lugares mas altos del mercado, y alcanzar a nuestra clientela dandonos a conocer por nuestros excelentes servicios</p>
            </div>
            <div className={styles.target}>
            <h2>Politica de Calidad</h2>
            <p> Somos una empresa dedicada a brindar los mejores productos realizados con madera, con los mas altos estandares de calidad, garantizando siempre la satifacción de nuestros clientes</p>
            </div>
            <NavLink
              className={styles.link_text}
              to="/"
            >
              Inicio
            </NavLink>

        </div>
    )
}

export default About
