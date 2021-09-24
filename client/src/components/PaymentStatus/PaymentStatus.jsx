import React, {useEffect} from 'react'
import { useDispatch } from "react-redux";
import { useLocation, useParams, useHistory } from "react-router-dom";
import {updateOrderStateById} from '../../redux/actions/index'

const FAILURE = 'failure';
const SUCCESS = 'success';
const PENDING = 'pending';

function PaymentStatus() {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { status } = useParams();

    useEffect(() => {
        const queries = new URLSearchParams(location.search)
        dispatch(updateOrderStateById({order_id: queries.get('external_reference'), status: 'completed'}))
    }, [dispatch])

    let title = '', text = ''
    if(status === SUCCESS){
        title = 'Compra realizada'
        text = 'La compra due realizada con éxito!'
    }else if(status === FAILURE){
        title = 'Compra No realizada'
        text = 'La compra no pudo realizarse'
    }else if(status === PENDING){
        title = 'Compra pendiente'
        text = 'La compra está pendiente'
    }

    function buttonHome(e){
        e.preventDefault();
        history.push('/');
    }
    return (
        <div>
            <h1>{title}</h1>
            <br/>
            <p>{text}</p>
            <br/>
            <button onClick={buttonHome}>Inicio</button>
        </div>
    )
}

export default PaymentStatus
