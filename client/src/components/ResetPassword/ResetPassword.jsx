import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useHistory } from "react-router-dom";
import { passwordReset } from "../../redux/actions";
import { signup } from "../../redux/actions/userActions";
import prdStyle from "./ResetPassword.module.css";
import { Button } from "@material-ui/core";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiArrowToLeft } from "react-icons/bi";
import swal from "sweetalert";

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.signupError);

  const [input, setInput] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== input.confirmPass) {
      swal({
        title: "Advertencia",
        text: "La contraseña que confirmaste debe ser igual la que elegiste",
        icon: "warning",
        button: "Ok",
      });
    } else {
      //console.log('input: ',input)
      let result = await dispatch(signup(input));
      console.log("result: ", result);
      // setInput({email: "busquetsla@gmail.com"});
      dispatch(passwordReset(input));
      setInput({
        email: "",
        password: "",
        confirmPass: "",
      });
      if (result.type === "error") {
        swal({
          title: "Advertencia",
          text: result.message,
          icon: "warning",
          button: "Ok",
        });
      } else {
        swal({
          title: "Resultado",
          text: result.message,
          icon: "success",
          button: "Ok",
        }).then((respuesta) => {
          if (respuesta) props.history.push("/shop");
        });
      }
      //history.push("/");
    }
  };

  return (
    <div className={prdStyle.ProdContent}>
      <fieldset className={prdStyle.ProdFieldset}>
        <legend className={prdStyle.ProdLegend}> Cambiar Contraseña </legend>
        <form className="form" onSubmit={handleSubmit}>
          {/* <div className={prdStyle.inputs}>
            <label htmlFor="name">Email</label>
            <input
              type="token"
              name="token"
              placeholder="ingresa el token enviado a tu correo"
              required
              onChange={handleChange}
            />
          </div> */}
          <div className={prdStyle.inputs}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="*******"
              required
              onChange={handleChange}
            />
          </div>
          <div className={prdStyle.inputs}>
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
            <div>
              <Button
                variant="contained"
                className={prdStyle.btnSave}
                type="submit"
                disableElevation
              >
                <AiOutlineUserAdd size="1.3em" />
                &nbsp;Cambiar Contraseña
              </Button>
              &nbsp;
              <NavLink to={`/shop`}>
                <Button
                  variant="contained"
                  className={prdStyle.btn1}
                  disableElevation
                >
                  <BiArrowToLeft size="1.3em" />
                  &nbsp;Volver
                </Button>
              </NavLink>
            </div>
          </div>
          {loading && <p>Loading</p>}
          {error && <p className="danger">{error}</p>}
        </form>
      </fieldset>
    </div>
  );
};

export default ResetPassword;
