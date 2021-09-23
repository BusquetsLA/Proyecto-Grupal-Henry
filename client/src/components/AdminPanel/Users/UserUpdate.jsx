import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { useHistory,NavLink }         from 'react-router-dom';
import { Button }                     from '@material-ui/core';
import { useLocation }                from "react-router";
import swal                           from 'sweetalert';
import { getUserById, updateUserById } from '../../../redux/actions/index';
import { BiSave, BiArrowToLeft }          from "react-icons/bi";
import AdmNav from '../AdmNav';
import ctgStyle from './Users.module.css';


export function validate(input) {
	let errors = {};
	if (!input.name) errors.name = 'El nombre de la categoría es obligatorio.';
	else if (!/([A-Z]|[a-z])\w+/.test(input.name)) errors.name = 'El nombre de la categoría es inválido.';
	return errors;
}

export default function CategoryUpdate() {
	const dispatch = useDispatch();
    const location = useLocation();
	const history = useHistory();
    const userDetail = useSelector((state) => state.userDetail);
    
	const userId = location.pathname.split("/").pop();
    
	useEffect(() => {
		dispatch(getUserById(userId));
        setInput({
            id: userId,
            name: userDetail.name,
            email: userDetail.email,
			isAdmin: userDetail.isAdmin,
			subscribed: userDetail.subscribed,
        });
	}, [dispatch,userDetail.name,userDetail.email]);


	const [input, setInput] = useState({
        id: 0,
		name: '',
		email: '',
		isAdmin:'',
		subscribed:'',
	});



	function handleChange(e) {
		if(e.target.value==="admin"){
			input.isAdmin= true
		}else{
			input.isAdmin= false
		}
		//console.log(input);
	}

	/* 	
	function handleChange2(e) {
		if(e.target.value==="suscrito"){
			input.subscribed= true
		}else{
			input.subscribed= false
		}
	}
	*/
	
	async function handleSubmit(e) {
		e.preventDefault();
		console.log(input)
		
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
		}); 
	}

	return (
		<>
		<AdmNav />
 		<div className={ctgStyle.Usrcontent}>
			<fieldset className={ctgStyle.UsrFieldset}>
				<legend className={ctgStyle.UsrLegend}> Actualizar Usuario </legend>
				<form onSubmit={(e) => {handleSubmit(e); }} >
					<div className={ctgStyle.inputs} >
						<label for="name" >Nombre</label>
						<input 
							type="text"
							name="name" 
							value={input.name} 
							onChange={(e) => handleChange(e)}
							placeholder="Nombre"
							required></input>
					{/* {errors.name && <p className="danger">{errors.name}</p>} */}
					</div>

					<div className={ctgStyle.inputs} >
						<label for="name" >E-mail</label>
						<input 
							type="text"
							name="email" 
							value={input.email} 
							onChange={(e) => handleChange(e)}
							placeholder="E-mail"
							required></input>
					{/* {errors.name && <p className="danger">{errors.email}</p>} */}
					</div>

					<div className={ctgStyle.inputs} >
						<label for="isAdmin" >Tipo de Usuario</label>
						<select name="isAdmin" className={ctgStyle.selectCss} onChange={(e) => handleChange(e)}>
							{userDetail.isAdmin ? (
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

{/* 
					<div className={ctgStyle.inputs} >
						<label for="subscribed" >Suscrito</label>
						<select name="subscribed" className={ctgStyle.selectCss} onChange={(e) => handleChange2(e)}>
							{userDetail.subscribed ? (
								<>
								<option value="nosuscrito" >No Suscrito</option>
								<option value="suscrito" selected>Suscrito</option>
								</>
							):(
								<>
								<option value="nosuscrito" selected>No Suscrito</option>
								<option value="suscrito" >Suscrito</option>
								</>
							)}
						</select>
					</div>
 */}

					<div>
						<Button 
							variant="contained" 
							className={ctgStyle.btnSave}
							type="submit"
							disableElevation>
								<BiSave size="1.3em" />&nbsp;Guardar
						</Button>
						&nbsp; &nbsp;
						<NavLink to={`/admin/adminpanel/users`}>
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
