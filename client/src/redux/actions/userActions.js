import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL } from '../constants/userConstants';
import axios from 'axios';

export const signup = ({name, email, password}) => {
    return async(dispatch) => {
        dispatch({
            type: USER_SIGNUP_REQUEST, 
            payload: {name, email, password}
        });
        console.log(name)
        const {data} = await axios.post('http://localhost:3001/user/signup', {name, email, password});
        
        if(data.token){
            dispatch({
                type: USER_SIGNUP_SUCCESS,
                payload: data
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            dispatch({
                type: USER_SIGNIN_REQUEST,
                payload: data
            });
        }else {
            dispatch({
                type: USER_SIGNUP_FAIL,
                payload: data.msg
            })
        }
        
    }
}

export const signin = ({email, password}) => {
    return async(dispatch) => {
        dispatch({
            type: USER_SIGNIN_REQUEST, 
            payload: {email, password}
        });
        const {data} = await axios.post('http://localhost:3001/user/signin', {email, password});
        console.log('esta es la data',data)
        // if(data.token){
            if(data.name){
            dispatch({
                type: USER_SIGNIN_SUCCESS,
                payload: data
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
        }else {
            dispatch({
                type: USER_SIGNIN_FAIL,
                payload: data.msg
            })
        }
        
    }
}

export const signinfirebase = (email) => {
    console.log(email)
    return async(dispatch) => {
        dispatch({
            type: USER_SIGNIN_REQUEST, 
            payload: {email}
        });
        const {data} = await axios.post('http://localhost:3001/user/signinfirebase', {email});
        // if(data.token){
        if(data){    
            dispatch({
                type: USER_SIGNIN_SUCCESS,
                payload: data
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
        }else {
            dispatch({
                type: USER_SIGNIN_FAIL,
                payload: data.msg
            })
        }
        
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cart');
    dispatch({
        type: USER_SIGNOUT
    });
}