import React, { useState }          from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory }      from "react-router-dom";
import { signout } from "../../redux/actions/userActions";
import { Button}                    from '@material-ui/core';
import { AiOutlineUserAdd }         from 'react-icons/ai';
import { BiArrowToLeft }            from 'react-icons/bi';
import swal                         from 'sweetalert';
import firebase                     from "firebase"
import prdStyle                     from "./Admin.module.css";
import axios from "axios";

function SignUp(props) {
  const dispatch = useDispatch();
  const history  = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const loading  = useSelector((state) => state.loading);
  const error    = useSelector((state) => state.signupError);
  //console.log(userInfo)
  
  const BASE_URL = "http://localhost:3001";

  const [input, setInput] = useState({
    secret: userInfo?.logged,
    token:'',
  });

  function handleSignout() {
    firebase.auth().signOut()
    dispatch(signout());
    props.history.push('/shop');
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(input)
    const { data } = await axios.post(`${BASE_URL}/user/totp-validate`,input);
    //console.log(data.valid)
    if(data.valid){
      swal({
				title:'Resultado',
				text: 'Validacion Exitosa usario Admin',
				icon: 'success',
				button: "Ok"
			})
			.then(respuesta => {
				if(respuesta) {
          props.history.push('/admin/adminpanel');
        }
			})
    }else{
      swal({
				title:'Advertencia',
				text: 'Validacion NO Exitosa !!, no puedes continuar',
				icon: 'warning',
				button: "Ok"
			})
      handleSignout()
      
    }
 
  };

  return (
    <div className={prdStyle.ProdContent}>
      <fieldset className={prdStyle.ProdFieldset}>
        <legend className={prdStyle.ProdLegend}> Validar Administrador   </legend>
        <form className="form" onSubmit={handleSubmit}>
          <div className={prdStyle.inputs}>
            <label htmlFor="name">Nombre</label>
            <input
              type="name"
              name="name"
              value={userInfo?.name}
              placeholder="nombre"
              disabled
            />
          </div>
          <div className={prdStyle.inputs}>
            <label htmlFor="email">Direccion email</label>
            <input
              type="email"
              name="email"
              value={userInfo?.email}
              placeholder="email"
              disabled
            />
          </div>
          <div className={prdStyle.inputs}>
            <label htmlFor="password">Cadena Secreta de Validacion</label>
            <span className={prdStyle.secret}>{userInfo?.logged}</span>
          </div>
          <div className={prdStyle.inputs}>
            <label htmlFor="confirmPass">Token</label>
            <input
              type="text"
              name="token"
              placeholder="### ###"
              required
              onChange={handleChange}
            />
          </div>
          <div >
            <div>
              <Button 
                variant="contained" 
                className={prdStyle.btnSave}
                type="submit"
                disableElevation>
                  <AiOutlineUserAdd size="1.3em" />&nbsp;Validar
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
