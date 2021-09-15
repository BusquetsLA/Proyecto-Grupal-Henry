import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import styles from "./Help.module.css";
import { sendHelpEmail } from '../../redux/actions';


const Help = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const[input, setInput] = useState({
    name: "",
    email: "",
    message: "",
})

function handleChange(e){

  setInput({
  ...input,
  [e.target.name] : e.target.value
  })
  console.log(input) //muestra el input en el navegador
}

function handleSubmit(e){
  e.preventDefault()
  console.log(input)
  dispatch(sendHelpEmail(input))
  setInput({
      name: "", email: "", message: "",})
  history.push('/')
}
  

  return (
    <div>
      <NavLink className={styles.link_text} to="/">
        Inicio
      </NavLink>
       <form id="form"  className={styles.form} onSubmit={(e)=>handleSubmit(e)}> {/* action="/sendEmail" method="POST" */}
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
          onChange={(e)=>handleChange(e)}/>
        <label for="email">
          Correo electrónico <span>*</span>
        </label>
        <input
          name="email"
          type="text"
          id="email"
          required
          placeholder="Correo de Contacto"
          onChange={(e)=>handleChange(e)}/>
        <label for="message">Mensaje <span>*</span></label>
        <textarea id="message" required name="message" cols="30" rows="9" onChange={(e)=>handleChange(e)}></textarea>
        <div className={styles.checkbox}><input required type="checkbox" id="politica" value="politica" onChange={(e)=>handleChange(e)}/><label for="politica">Aceptas Nuestra <a href="https://afl0r3s.github.io/Proyecto-Grupal-Henry-client/#/politica" target="_blank" rel="noreferrer">
              <u>Politica de Tratamiento de Datos</u></a>
        <span>*</span></label>
        </div>
        <button type="submit" className={styles.btn}>
          Enviar Mensaje
        </button>
      </form>
      {/* <a href="mailto:estilopropio@gmail.com" id="oculto"></a> */}
    </div>
  );
};

export default Help;
