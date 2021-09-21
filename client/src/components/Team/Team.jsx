import React from "react";
import styles from "./Team.module.css";
import { NavLink } from "react-router-dom";

const Team = () => {
  return (
    <div className={styles.fondo}>
        <h1>NUESTRO EQUIPO</h1>
      <div className={styles.team}>
      <div className={styles.container}>
        <div className={styles.foto_nombre}>
          <img
            src="https://res.cloudinary.com/dulpsdgfw/image/upload/v1631649008/Fotos/CamiloCerqueraB_N_x2doyy.png"
            alt="foto"
          />
          <h4>Camilo Andrés Cerquera</h4>
        </div>
        <div className={styles.links}>
          <a
            href="https://www.linkedin.com/in/camilo-cerquera/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              width="55px"
              height="55px"
              src="https://image.flaticon.com/icons/png/512/61/61109.png"
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://github.com/Keltuzad29"
            target="_blank"
            rel="noreferrer"
          >
             <img
              width="100px"
              height="60px"
              src="https://1000marcas.net/wp-content/uploads/2020/02/logo-GitHub.png"
              alt="GitHub"
            />
          </a>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.foto_nombre}>
          <img
            src="https://res.cloudinary.com/dulpsdgfw/image/upload/v1632253931/Fotos/Alejo1_vcaklp.png"
            alt="foto"
          />
          <h4>Alejandro Flores</h4>
        </div>
        <div className={styles.links}>
          <a
            href=" linkedin.com/in/alejandro-flores-dev"
            target="_blank"
            rel="noreferrer"
          >
            <img
              width="55px"
              height="55px"
              src="https://image.flaticon.com/icons/png/512/61/61109.png"
              alt="LinkedIn"
            />
          </a>
          <a
            href="github.com/afl0r3s"
            target="_blank"
            rel="noreferrer"
          >
             <img
              width="100px"
              height="60px"
              src="https://1000marcas.net/wp-content/uploads/2020/02/logo-GitHub.png"
              alt="GitHub"
            />
          </a>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.foto_nombre}>
          <img
            src="https://res.cloudinary.com/dulpsdgfw/image/upload/v1632260192/Fotos/Esteban1_axa9zi.png"
            alt="foto"
          />
          <h4>Esteban Choque</h4>
        </div>
        <div className={styles.links}>
          <a
            href="https://www.linkedin.com/in/esteban-choque"
            target="_blank"
            rel="noreferrer"
          >
            <img
              width="55px"
              height="55px"
              src="https://image.flaticon.com/icons/png/512/61/61109.png"
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://github.com/estebanchoque"
            target="_blank"
            rel="noreferrer"
          >
             <img
              width="100px"
              height="60px"
              src="https://1000marcas.net/wp-content/uploads/2020/02/logo-GitHub.png"
              alt="GitHub"
            />
          </a>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.foto_nombre}>
          <img
            src="https://res.cloudinary.com/dulpsdgfw/image/upload/v1632259362/Fotos/Facundo_kyi8da.png"
            alt="foto"
          />
          <h4>Facundo Figueroa</h4>
        </div>
        <div className={styles.links}>
          <a
            href="https://www.linkedin.com/in/facundo-figueroa-dev"
            target="_blank"
            rel="noreferrer"
          >
            <img
              width="55px"
              height="55px"
              src="https://image.flaticon.com/icons/png/512/61/61109.png"
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://github.com/FacundoFigueroa23"
            target="_blank"
            rel="noreferrer"
          >
             <img
              width="100px"
              height="60px"
              src="https://1000marcas.net/wp-content/uploads/2020/02/logo-GitHub.png"
              alt="GitHub"
            />
          </a>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.foto_nombre}>
          <img
            src="https://res.cloudinary.com/dulpsdgfw/image/upload/v1632253931/Fotos/Lautaro1_xslsio.png"
            alt="foto"
          />
          <h4>Lautaro Agustín Busquets</h4>
        </div>
        <div className={styles.links}>
          <a
            href="https://www.linkedin.com/in/busquets-lautaro-agustin/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              width="55px"
              height="55px"
              src="https://image.flaticon.com/icons/png/512/61/61109.png"
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://github.com/BusquetsLA"
            target="_blank"
            rel="noreferrer"
          >
             <img
              width="100px"
              height="60px"
              src="https://1000marcas.net/wp-content/uploads/2020/02/logo-GitHub.png"
              alt="GitHub"
            />
          </a>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.foto_nombre}>
          <img
            src="https://res.cloudinary.com/dulpsdgfw/image/upload/v1632254279/Fotos/Mauro1_idrsud.png"
            alt="foto"
          />
          <h4>Mauricio Serrano</h4>
        </div>
        <div className={styles.links}>
          <a
            href="https://www.linkedin.com/in/mauro-serrano-80400a1a4"
            target="_blank"
            rel="noreferrer"
          >
            <img
              width="55px"
              height="55px"
              src="https://image.flaticon.com/icons/png/512/61/61109.png"
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://github.com/maurinholex1000"
            target="_blank"
            rel="noreferrer"
          >
             <img
              width="100px"
              height="60px"
              src="https://1000marcas.net/wp-content/uploads/2020/02/logo-GitHub.png"
              alt="GitHub"
            />
          </a>
        </div>
        </div>
      </div>
      <NavLink to="/">
        <h2 className={styles.home}>Home</h2>
      </NavLink>
    </div>
  );
};

export default Team;
