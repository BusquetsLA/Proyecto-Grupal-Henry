import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { useHistory,NavLink }         from 'react-router-dom';
import { Button }                     from '@material-ui/core';
import { useLocation }                from "react-router";
import swal                           from 'sweetalert';
import { getOrderById, getUsers, getUserById } from '../../../redux/actions/index';
import { BiSave, BiArrowToLeft }          from "react-icons/bi";
import AdmNav from '../AdmNav';
import ctgStyle from './Orders.module.css';


export default function CategoryUpdate() {
	const dispatch = useDispatch();
    const location = useLocation();
	const history = useHistory();
    const orderDetail = useSelector((state) => state.orderDetail);
    const usersArr = useSelector((state) => state.users);
	const orderId = location.pathname.split("/").pop();
	console.log('1',orderDetail)
	console.log('2',usersArr)
    
	const getUserMail = (e)=>{
		console.log(e)
		/* let busca = usersArr.find(b=> b._id===e)
		return busca && busca.email; */
	}

	useEffect(() => {
		dispatch(getOrderById(0,orderId));
		dispatch(getUsers());
		setInput({
			id:orderId,
		})
	}, [dispatch,orderId]);


	const [input, setInput] = useState({
        id: 0,
	});



	function handleChange(e) {
		if(e.target.value==="admin"){
			input.isAdmin= true
		}else{
			input.isAdmin= false
		}
		//console.log(input);
	}

	
	async function handleSubmit(e) {
		e.preventDefault();
		console.log(input)
	/* 	
		let message = await dispatch(updateUserById(input));
		console.log(message)

		if(message.payload.type === "success"){
			swal({
				title:'Resultado',
				text: message.payload.message,
				icon: 'success',
				button: "Ok"
			})
			.then(respuesta => {
				if(respuesta) history.push('/admin/adminpanel/users');
			})
		}else{
			swal({
				title:'Resultado',
				text: message.payload.message,
				icon: 'warning',
				button: "Ok"
			})
		}
		setInput({
            id: 0,
			name: '',
		});  */
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
						<input 
							type="text"
							name="id" 
							value={input.id} disabled></input>
					</div>

					<div className={ctgStyle.inputs} >
						<label for="email" >E-mail</label>
						<input 
							type="text"
							name="email" 
							value={input.email} disabled></input>
					{/* {errors.name && <p className="danger">{errors.email}</p>} */}
					</div>

					<div className={ctgStyle.inputs} >
						<label for="isAdmin" >Tipo de Usuario</label>
						<select name="isAdmin" className={ctgStyle.selectCss} onChange={(e) => handleChange(e)}>
							{orderDetail.isAdmin ? (
								<>
								<option value="normal" >Normal</option>
								<option value="admin" selected>Administrador</option>
								</>
							):(
								<>
								<option value="normal" selected>Normal</option>
								<option value="admin" >Administrador</option>
								</>
							)}
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
