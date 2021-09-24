import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { useHistory,NavLink, Link }         from 'react-router-dom';
import { Button }                     from '@material-ui/core';
import { useLocation }                from "react-router";
import swal                           from 'sweetalert';
import { getOrderById, getUserById, 
	updateOrderStateById,
	sendOrderDispatchEmail } from '../../../redux/actions/index';
import { BiSave, BiArrowToLeft }          from "react-icons/bi";
import AdmNav from '../AdmNav';
import ctgStyle from './Orders.module.css';


export default function CategoryUpdate() {
	const dispatch = useDispatch();
    const location = useLocation();
	const history  = useHistory();
    const orderDetail = useSelector((state) => state.orderDetail);
    const userDetail  = useSelector((state) => state.userDetail);
	const orderId = location.pathname.split("/").pop();
	const userID  = orderDetail.user_id && orderDetail.user_id;
	
	//console.log(orderDetail)


	useEffect(() => {
		dispatch(getOrderById(0,orderId));
		dispatch(getUserById(userID))
		setInput({
			order_id:orderId,
			status:orderDetail.status
		})
	}, [dispatch,orderId,orderDetail.status,userID]);


	const [input, setInput] = useState({
		order_id:0,
		status: '',
	});

	function handleChange(e) {
		console.log(e.target.value)
		setInput({
			...input,
			status:e.target.value
		})
	}

	
	async function handleSubmit(e) {
		e.preventDefault();
		// console.log('estado actual ',orderDetail.status)
		// console.log(input)
		if(orderDetail.status === input.status){
			swal({
				title:'Advertencia',
				text: 'No seleccionaste un nuevo estado, no se podra actualizar el estado de la Orden..',
				icon: 'warning',
				button: "Ok"
			})
		}else{
			let message = await dispatch(updateOrderStateById(input));
			if(input.status === 'completed'){
				var mailProductDispatch = {
					name:userDetail.name,
					email:userDetail.email
				}
				//console.log(mailProductDispatch)
				let mensaje2 = await dispatch(sendOrderDispatchEmail(mailProductDispatch))
				//console.log(mensaje2)
			}
			//console.log(message)
			if(message.payload.type === "success"){
				swal({
					title:'Resultado',
					text: message.payload.message,
					icon: 'success',
					button: "Ok"
				})
				.then(respuesta => {
					if(respuesta) history.push('/admin/adminpanel/orders');
				})
			}else{
				swal({
					title:'Advertencia',
					text: message.payload.message,
					icon: 'warning',
					button: "Ok"
				}).then(respuesta => {
					if(respuesta) history.push('/admin/adminpanel/orders');
				})
			}
			setInput({
				order_id: 0,
				status: '',
			});
		}
	}

	return (
		<>
		<AdmNav />
 		<div className={ctgStyle.Usrcontent}>
			<fieldset className={ctgStyle.UsrFieldset}>
				<legend className={ctgStyle.UsrLegend}> Detalle de Orden </legend>
				<form onSubmit={(e) => {handleSubmit(e); }} >
					<div className={ctgStyle.inputs} >
						<label for="id" >ID</label>
						<span className={ctgStyle.info1}> {userDetail._id} </span>
					</div>

					<div className={ctgStyle.inputs} >
						<label for="name" >Nombre</label>
						<span className={ctgStyle.info1}> {userDetail.name} </span>
					</div>

					<div className={ctgStyle.inputs} >
						<label for="email" >E-mail</label>
						<span className={ctgStyle.info1}> {userDetail.email} </span>
					</div>

					<div className={ctgStyle.inputs} >
						<label for="items" >Items</label>
						<span className={ctgStyle.info1}>
							<div className={ctgStyle.info2}>
								<span style={{width:'70%'}}> <b>Producto</b> </span> 
								<span style={{width:'25%'}}> <b>Cantidad</b> </span>
								<span style={{width:'25%'}}> <b>Precio Unitario</b> </span>
							</div>
						{orderDetail.items && orderDetail.items.map(item => (
							<div className={ctgStyle.info2}>
								<span style={{width:'70%'}}> <Link to={`/detail/${item._id}`} target='_blank'>{item.name} </Link> </span> 
								<span style={{width:'25%'}}> {item.quantity} </span>
								<span style={{width:'25%'}}> {item.price?.$numberDecimal} </span>
							</div>
							))
						} 
						<div className={ctgStyle.info3}>
							Total : {orderDetail.total && orderDetail.total?.$numberDecimal }
							{/* Total : {orderDetail.total?.$numberDecimal && '$'} */}
						</div>
						</span>
					</div>

					<div className={ctgStyle.inputs} >
						<label for="isAdmin" >Estado de Orden</label>
						<span className={ctgStyle.info1}> {orderDetail.status} </span>
						<select name="isAdmin" className={ctgStyle.selectCss} onChange={(e) => handleChange(e)}>
							{orderDetail.status === 'created'? (
								<>
								<option value="created" selected disabled>Creado</option>
								<option value="processing">Procesando</option>
								<option value="cancelled" >Cancelada</option>
								</>
							): orderDetail.status === 'processing'? (
								<>
								<option value="processing" selected disabled>Procesada</option>
								<option value="cancelled" >Cancelada</option>
								<option value="completed">Completada</option>
								</>
							): 
								<>
								<option value="none" disabled>No se puede cambiar el Estado</option>
								</>
							}
						</select>
					</div>

					<div>
						<Button 
							variant="contained" 
							className={ctgStyle.btnSave}
							type="submit"
							disableElevation>
								<BiSave size="1.3em" />&nbsp;Guardar
						</Button>
						&nbsp; &nbsp;
						<NavLink to={`/admin/adminpanel/orders`}>
							<Button 
								variant="contained" 
								className={ctgStyle.btn1}
								type="submit"
								disableElevation>
									<BiArrowToLeft size="1.3em" />&nbsp;Volver
							</Button>
						</NavLink>
					</div>
				</form>
			</fieldset>
		</div>
		</>
	);
}
