import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addCategory, getCategories } from '../../../redux/actions/index';
import AdmNav from '../AdmNav';
import ctgStyle from './CreateCategory.module.css';


export function validate(input) {
	let errors = {};
	if (!input.name) errors.name = 'El nombre de la categoría es obligatorio.';
	else if (!/([A-Z]|[a-z])\w+/.test(input.name)) errors.name = 'El nombre de la categoría es inválido.';
	return errors;
}

export default function AddCategories() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategories());
	  }, [dispatch]);

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

	function handleSubmit(e) {
		e.preventDefault();
		input.name = input.name[0].toLocaleUpperCase() + input.name.slice(1)
		dispatch(addCategory(input));
		alert("Categoría creada exitosamente.");
		setInput({
			name: '',
		});
		history.push('/admin/adminpanel/categories');
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
