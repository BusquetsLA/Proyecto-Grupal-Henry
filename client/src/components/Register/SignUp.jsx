import React, { useState }          from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory }      from "react-router-dom";
import { sendRegisterEmail }        from "../../redux/actions";
import { signup }                   from "../../redux/actions/userActions";
import prdStyle                     from "./SignUp.module.css";
import { Button}                    from '@material-ui/core';
import { AiOutlineUserAdd }         from 'react-icons/ai';
import { BiArrowToLeft }            from 'react-icons/bi';
import swal                         from 'sweetalert';

function SignUp(props) {
  const dispatch = useDispatch();
  const history  = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const loading  = useSelector((state) => state.loading);
  const error    = useSelector((state) => state.signupError);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== input.confirmPass) {
      swal({
				title:'Advertencia',
				text: 'La contraseña que confirmaste debe ser igual la que elegiste',
				icon: 'warning',
				button: "Ok"
			})
    } else {
      //console.log('input: ',input)
      let result = await dispatch(signup(input));
      console.log('result: ',result)
      dispatch(sendRegisterEmail(input));
      setInput({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
      });
      if(result.type === 'error'){
        swal({
          title:'Advertencia',
          text: result.message,
          icon: 'warning',
          button: "Ok"
        })
      }else{
        swal({
          title:'Resultado',
          text: result.message,
          icon: 'success',
          button: "Ok"
        })
        .then(respuesta => {
          if(respuesta) props.history.push('/login');
        })
      }
      //history.push("/");
    }
  };

  return (
    <div className={prdStyle.ProdContent}>
      <fieldset className={prdStyle.ProdFieldset}>
        <legend className={prdStyle.ProdLegend}> Sign Up </legend>
        <form className="form" onSubmit={handleSubmit}>
          <div className={prdStyle.inputs}>
            <label htmlFor="name">Nombre</label>
            <input
              type="name"
              name="name"
              placeholder="nombre"
              required
              onChange={handleChange}
            />
          </div>
          <div className={prdStyle.inputs}>
            <label htmlFor="email">Direccion email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              required
              onChange={handleChange}
            />
          </div>
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
          <div >
            <label />
            <div className={prdStyle.checkbox}>
              <input
                required
                type="checkbox"
                id="politica"
                value="politica"
                onChange={(e) => handleChange(e)}
              />
              <label for="politica">
                Aceptas Nuestra{" "}
                <NavLink to={`/politica`} target="_blank" rel="noreferrer">
                  <u>Politica de Tratamiento de Datos</u>
                </NavLink>
                <span>*</span>
              </label>
            </div>
            <div>
              <Button 
                variant="contained" 
                className={prdStyle.btnSave}
                type="submit"
                disableElevation>
                  <AiOutlineUserAdd size="1.3em" />&nbsp;Sign Up
              </Button>
              &nbsp;
              <NavLink to={`/login`}>
                <Button 
                  variant="contained" 
                  className={prdStyle.btn1}
                  disableElevation>
                    <BiArrowToLeft size="1.3em" />&nbsp;Volver
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
}

export default SignUp;
