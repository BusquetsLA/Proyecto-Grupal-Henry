import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router";
import { getCategoryDetails, updateCategory, getProducts } from '../../../redux/actions/index';
import AdmNav from '../AdmNav';
import Select from 'react-select';
import ctgStyle from './CreateCategory.module.css';


export function validate(input) {
	let errors = {};
	if (!input.name) errors.name = 'El nombre de la categoría es obligatorio.';
	else if (!/([A-Z]|[a-z])\w+/.test(input.name)) errors.name = 'El nombre de la categoría es inválido.';
	return errors;
}

export default function CategoryUpdate() {
	const dispatch = useDispatch();
    var categoryDetail = useSelector((state) => state.categoryDetails);
    const location = useLocation();
    var categoryId = location.pathname.split("/").pop();
    //console.log(categoryDetail)
    
	useEffect(() => {
		dispatch(getCategoryDetails(categoryId));
        setInput({
            id: categoryId,
            name: categoryDetail.name,
        });
	  }, [dispatch, categoryId,categoryDetail.name]);

	const history = useHistory();

	var productsArr = useSelector((state) => state.products.all);
	productsArr = productsArr.map(e=> {
		return {
			value: e._id,
			label: e.name,
		}
	})
  
	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	const [value, setValue] = useState([])

	const [input, setInput] = useState({
        id: 0,
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
            id: categoryId,
			[e.target.name]: e.target.value,
		});
	}

	function onSelectChange(e){
		setValue(e);
		//console.log(e[0].value)
	  }

	function handleSubmit(e) {
		e.preventDefault();
        input.name = input.name[0].toLocaleUpperCase() + input.name.slice(1)
		const dataSend ={
			...input,
			products: value.map(e => e.value),
		}
		console.log(dataSend)
		dispatch(updateCategory(dataSend));
		alert("Categoría actualizada exitosamente.");
		setInput({
            id: 0,
			name: '',
			products: [],
		});
		history.push('/admin/adminpanel/categories'); 
	}

	return (
		<>
		<AdmNav />
 		<div className={ctgStyle.Catcontent}>
			<fieldset className={ctgStyle.CatFieldset}>
				<legend className={ctgStyle.CatLegend}> Actualizar Categoria </legend>
				<form onSubmit={(e) => {handleSubmit(e); }} >
					<div className={ctgStyle.inputs} >
						<input 
							type="text"
							name="name" 
							value={input.name} 
							onChange={(e) => handleChange(e)}
							placeholder="Categoria .."
							required></input>
					{errors.name && <p className="danger">{errors.name}</p>}
					</div>

					<div className={ctgStyle.ProdSelect}>
						<label for="products">Productos</label>
						<Select 
							value={value}
							options={productsArr}
							onChange={(e) => onSelectChange(e)}
							isMulti
							/>
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
