import React, { useEffect, useState, componentDidMount  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin,signinfirebase } from '../../redux/actions/userActions';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
    apiKey: "AIzaSyB2SWhaL9z0_2ttfnkCk6aMq9lD0e8xtJ4",
    authDomain: "fir-auth-muebleria.firebaseapp.com"
  })
  
function SignIn(props) {
    const [isSignedIn, setisSignedIn] = useState(false)

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
        firebase.auth().onAuthStateChanged(user => {
        //   this.setState({ isSignedIn: !!user })
        //   setisSignedIn(!!user)
          console.log("user", user)
          
          if(user){
            console.log(firebase.auth().currentUser.email)
            dispatch(signinfirebase(firebase.auth().currentUser.email));
            if(userInfo){
                props.history.push(redirect);
            }
            
          }
        })
      })






    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const userInfo = useSelector(state => state.userInfo);
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.signinError);
    const redirect = props.location.search 
    ? props.location.search.split('=')[1] 
    : '/';

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signin(input));
    }
    useEffect(() => {
        console.log(userInfo)
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo]);

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <p>Loading</p>}
                {error && <p className="danger">{error}</p>}
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
                    <label />
                    <button className="primary" type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    <label/>
                    <div>
                        No tienes una cuenta?
                        <Link to='/signup'>Crear una cuenta. </Link>
                        <Link to='/'> Volver al inicio</Link>
                    </div>
                </div>
            </form> 
            {isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
          </span>
        ) : (

            <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
            />
            )}
        </div>
    )
}

export default SignIn;
