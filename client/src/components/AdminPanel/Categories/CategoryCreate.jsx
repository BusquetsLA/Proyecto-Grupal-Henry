import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addCategory, getCategories } from '../../../redux/actions/index';
import AdmNav from '../AdmNav';
import ctgStyle from './CreateCategory.module.css';
import swal from 'sweetalert';

export function validate(input) {
	let errors = {};
	if (!input.name) errors.name = 'El nombre de la categoría es obligatorio.';
	else if (!/([A-Z]|[a-z])\w+/.test(input.name)) errors.name = 'El nombre de la categoría es inválido.';
	return errors;
}

export default function AddCategories() {
	
	//Revision de codigo para Borrar !!
	/*
	
	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);
	
	*/
	
	const dispatch = useDispatch();
	const history = useHistory();

	const [input, setInput] = useState({
		name: '',
	});

	const [errors, setErrors] = useState({});

	function handleChange(e) {
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			}),
		);

		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();
		input.name = input.name[0].toLocaleUpperCase() + input.name.slice(1)
		let message = await dispatch(addCategory(input));
		console.log(message.result);
		if(message.result.statusText === "OK"){
			swal({
				title:'Resultado',
				text: message.result.data.message,
				icon: 'success',
				button: "Ok"
			})
			.then(respuesta => {
				if(respuesta) history.push('/admin/adminpanel/categories');
			})
		}else{
			swal({
				title:'Resultado',
				text: message.result.data.message,
				icon: 'warning',
				button: "Ok"
			})
		}
		//alert("Categoría creada exitosamente.");
		//history.push('/admin/adminpanel/categories');
		setInput({
			name: '',
		});
	}

	return (
		<>
		<AdmNav />
 		<div className={ctgStyle.Catcontent}>
			<fieldset className={ctgStyle.CatFieldset}>
				<legend className={ctgStyle.CatLegend}> Crear Categoria </legend>
				<form onSubmit={(e) => {handleSubmit(e); }} >
					<div className={ctgStyle.inputs} >
						<input 
							type="text"
							name="name" 
							value={input.name} 
							onChange={(e) => handleChange(e)}
							placeholder="Nombre Categoria nueva.."
							required></input>
					{errors.name && <p className="danger">{errors.name}</p>}
					</div>
					<div>
						<button className={ctgStyle.myButton} type="submit">Guardar</button>
					</div>
				</form>
			</fieldset>
		</div>
		</>
	);
}
