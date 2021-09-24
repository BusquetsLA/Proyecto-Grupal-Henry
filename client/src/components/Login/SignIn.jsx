import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector }    from 'react-redux';
import { Link, NavLink }               from 'react-router-dom';
import { signin,signinfirebase }       from '../../redux/actions/userActions';
import firebase                        from "firebase"
import StyledFirebaseAuth              from "react-firebaseui/StyledFirebaseAuth"
import prdStyle                        from './Login.module.css';
import {Button}                        from '@material-ui/core';
import { GoSignIn, GoSignOut }         from "react-icons/go";
import { BiArrowToLeft }               from 'react-icons/bi';
import { AiOutlineUserAdd }            from 'react-icons/ai';
import swal                            from 'sweetalert';
import { signout } from "../../redux/actions/userActions";

firebase.initializeApp({
    apiKey: "AIzaSyB2SWhaL9z0_2ttfnkCk6aMq9lD0e8xtJ4",
    authDomain: "fir-auth-muebleria.firebaseapp.com"
});

function SignIn(props) {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const loading  = useSelector(state => state.loading);
    const error    = useSelector(state => state.signinError);
    const [isSignedIn, setisSignedIn] = useState(false)

    //console.log('props is: ', props)

    let uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            //this.setState({ isSignedIn: !!user })
            //setisSignedIn(!!user)
            console.log("user", user)
            
            if(user){
                let userData = {
                    name: firebase.auth().currentUser.displayName,
                    email:firebase.auth().currentUser.email
                }
                //console.log(userData)
                let result = await dispatch(signinfirebase(userData));
                console.log('result: ',result)
                if(result.type === 'error'){
                    swal({
                        title:'Resultado',
                        text: result.message,
                        icon: 'warning',
                        button: "Ok"
                    })
                    handleSignout()
                }
                if(result.type === 'success'){
                    swal({
                        title:'Resultado',
                        text: result.message,
                        icon: 'success',
                        button: "Ok"
                    })
                    .then(respuesta => {
                        if(respuesta) props.history.push('/');
                    })
                }
                if(result.name){
                    swal({
                        title:'Resultado',
                        text: 'SignIn exitoso...',
                        icon: 'success',
                        button: "Ok"
                    })
                    .then(respuesta => {
                        if(respuesta) props.history.push('/');
                    })
                }
                /*
                if(userInfo){
                    props.history.push('/');
                } */
            } 
        })
    },[dispatch])


    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    
    /* const redirect = props.location.search 
    ? props.location.search.split('=')[1] 
    : '/'; */

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log('input: ',input)
        var result = await dispatch(signin(input));
        //console.log('result: ',result.type)
        if(result.type === 'error'){
            swal({
				title:'Resultado',
				text: result.message,
				icon: 'warning',
				button: "Ok"
			})
        }else{
            swal({
				title:'Resultado',
				text: 'Validacion Exitosa',
				icon: 'success',
				button: "Ok"
			})
			.then(respuesta => {
				if(respuesta) {
                    if(result.isAdmin) props.history.push('/admin/validate');
                    else props.history.push('/shop');
                }
			})
        }
    }

    function handleSignout() {
        firebase.auth().signOut()
        dispatch(signout());
      }

    return (
        <div className={prdStyle.ProdContent}>
            <fieldset className={prdStyle.ProdFieldset}>
                <legend className={prdStyle.ProdLegend}> Sign In </legend>
                {userInfo ? (
                    <>
                        <span>Conectado como: {userInfo.name}...</span>
                        <Button 
                                variant="contained" 
                                className={prdStyle.btnSave}
                                onClick={handleSignout}
                                disableElevation>
                                    <GoSignOut size="1.3em" />&nbsp;Sign Out
                            </Button>
                            <br/><br/>
                        <NavLink to={`/`}>
                            <Button 
                                variant="contained" 
                                className={prdStyle.btn1}
                                disableElevation>
                                    <BiArrowToLeft size="1.3em" />&nbsp;Volver
                            </Button>
                        </NavLink>
                    </>
                ):(
                    <>
                    <form className="form" onSubmit={handleSubmit}>
                        {loading && <p>Loading</p>}
                        {error && <p className="danger">{error}</p>}
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
                        <div className={prdStyle.contentBtn}>
                            <Button 
                                variant="contained" 
                                className={prdStyle.btnSave}
                                type="submit"
                                disableElevation>
                                    <GoSignIn size="1.3em" />&nbsp;Sign In
                            </Button>
                            &nbsp;
                            <NavLink to={`/`}>
                                <Button 
                                    variant="contained" 
                                    className={prdStyle.btn1}
                                    disableElevation>
                                        <BiArrowToLeft size="1.3em" />&nbsp;Volver
                                </Button>
                            </NavLink>
                        </div>
                        <div>
                            <div>
                                No tienes una cuenta?
                                <NavLink to={`/signup`}>
                                <Button 
                                    variant="contained" 
                                    className={prdStyle.btnUpdate}
                                    disableElevation>
                                        <AiOutlineUserAdd size="1.3em" />&nbsp;Crear una cuenta
                                </Button>
                                </NavLink>
                                <Button 
                                variant="contained" 
                                className={prdStyle.btnSave}
                                onClick={handleSignout}
                                disableElevation>
                                    <GoSignOut size="1.3em" />&nbsp;Sign Out
                            </Button>
                            </div>
                        </div>
                    </form>
                    <Link  to="/user/reset">
                      Cambiar Contraseña 
                    </Link>
                    <StyledFirebaseAuth
                            uiConfig={uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                </>
                )}
            </fieldset>
        </div>
    )
}

export default SignIn;
