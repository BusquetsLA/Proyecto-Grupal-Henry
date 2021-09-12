import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Help.module.css";

const Help = () => {
  //    const $form = document.querySelector('#form')
  //    const $buttonMailto = document.querySelector("#oculto")
  //   $form.addEventListener('submit', handleSubmit);

  //    function handleSubmit(e) {
  //             e.preventDefault();
  //     const form = new FormData(this);
  //     console.log(form.get("name"));
  //     $buttonMailto.serAttribute(
  //       'href',
  //       `mailto:estilopropio@gmail.com?subject=nombre ${form.get(
  //         "name"
  //       )} correo ${form.get("email")}&body=${form.get("message")}`
  //     );
  //     $buttonMailto.click();
  //    }
  return (
    <div>
      <NavLink className={styles.link_text} to="/">
        Inicio
      </NavLink>
      <form id="form" action="/sendEmail" method="POST" className={styles.form}>
        <h3 className={styles.tag}>
          <span>SI TIENES ALGUNA DUDA O SUGERENCIA ENVIANOS UN CORREO</span>
        </h3>
        <label for="name">
          Nombre Completo <span>*</span>
        </label>
        <input
          name="name"
          required
          type="text"
          id="name"
          placeholder="Dejanos Tu Nombre"
        />
        <label for="email">
          Correo electrónico <span>*</span>
        </label>
        <input
          name="email"
          type="text"
          id="email"
          required
          placeholder="Correo de Contacto"
        />
        <label for="message">Mensaje</label>
        <textarea id="message" name="message" cols="30" rows="9"></textarea>
        <button type="submit" className={styles.btn}>
          enviar mensaje
        </button>
      </form>
      {/* <a href="mailto:estilopropio@gmail.com" id="oculto"></a> */}
    </div>
  );
};

export default Help;
