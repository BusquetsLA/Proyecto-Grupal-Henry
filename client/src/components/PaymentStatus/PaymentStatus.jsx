import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useHistory } from "react-router-dom";
import {updateOrderStateById, sendPaymentEmail} from '../../redux/actions/index'

const FAILURE = 'failure';
const SUCCESS = 'success';
const PENDING = 'pending';

function PaymentStatus() {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const userInfo = useSelector((state) => state.userInfo);
    const { status } = useParams();

    let title = '', text = '', orderStatus = ''
    if(status === SUCCESS){
        title = 'Compra realizada'
        text = 'La compra fue realizada con éxito! Se le acaba de enviar un mail a su correo con el detalle de la orden.'
        orderStatus = 'completed'
    }else if(status === FAILURE){
        title = 'Compra No realizada'
        text = 'La compra no pudo realizarse'
        orderStatus = 'cancelled'
    }else if(status === PENDING){
        title = 'Compra pendiente'
        text = 'La compra está pendiente'
        orderStatus = 'processing'
    }

    useEffect(() => {
        const queries = new URLSearchParams(location.search)
        dispatch(updateOrderStateById({order_id: queries.get('external_reference'), status: orderStatus}))
        if(orderStatus === 'completed'){
            dispatch(sendPaymentEmail({email: userInfo.email}))
        }
    }, [dispatch])

    function buttonHome(e){
        e.preventDefault();
        history.push('/shop');
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
