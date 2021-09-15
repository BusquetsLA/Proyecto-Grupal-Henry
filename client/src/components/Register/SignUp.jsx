import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { sendRegisterEmail } from "../../redux/actions";
import { signup } from "../../redux/actions/userActions";
import styles from "./SignUp.module.css";

function SignUp(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.signupError);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.password !== input.confirmPass) {
      alert("La contraseña que confirmaste debe ser igual la que elegiste");
    } else {
      dispatch(signup(input));
      dispatch(sendRegisterEmail(input));
      setInput({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
      });
      history.push("/");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Sign Up</h1>
        </div>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="name"
            name="name"
            placeholder="nombre"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Direccion email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="*******"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPass">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPass"
            placeholder="*******"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label />
          <div className={styles.checkbox}>
            <input
              required
              type="checkbox"
              id="politica"
              value="politica"
              onChange={(e) => handleChange(e)}
            />
            <label for="politica">
              Aceptas Nuestra{" "}
              <a href="https://afl0r3s.github.io/Proyecto-Grupal-Henry-client/#/politica" target="_blank" rel="noreferrer">
              <u>Politica de Tratamiento de Datos</u></a>
              <span>*</span>
            </label>
          </div>
          <button className="primary" type="submit">
            Sign Up
          </button>
        </div>
        {loading && <p>Loading</p>}
        {error && <p className="danger">{error}</p>}
        <div>
          <label />
          <div>
            <Link to="/"> Volver al inicio</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
