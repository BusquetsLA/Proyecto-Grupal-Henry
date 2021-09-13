import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router";
import { updateProduct,getProductsById, getCategories } from '../../../redux/actions/index';
import prdStyle from './Products.module.css';
import Select from 'react-select';
import AdmNav from '../AdmNav';

export function validate(input) {
	let errors = {};
	if (!input.name) errors.name = 'El nombre de la categoría es obligatorio.';
	else if (!/([A-Z]|[a-z])\w+/.test(input.name)) errors.name = 'El nombre de la categoría es inválido.';

	if (!input.description) errors.description = 'La descripcion es obligatoria.';
	else if (!/([A-Z]|[a-z])\w+/.test(input.description)) errors.description = 'El nombre de la descripcion es inválido.';

	if (!input.image_url) errors.image_url = 'La URL de la imagen es obligatoria';
	else if (
		!/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/.test(
			input.image_url,
		)
	)
		errors.image_url = 'El formato de la URL no es correcto..';

	if (!input.price) errors.price = 'El monto del Precio es obligatorio.';
	else if (!/\d+\.\d{2}/.test(input.price)) errors.price = 'El formato de Precio es inválido.';

	if (!input.stock) errors.stock = 'El Stock es obligatorio.';
	else if (!/\d/.test(input.stock)) errors.stock = 'El formato de Stock es inválido.';

	return errors;
}

export default function AddProducts() {
	const dispatch = useDispatch();
	var productDetail = useSelector((state) => state.productDetails);
	const location = useLocation();
    var productId = location.pathname.split("/").pop();
	console.log(productDetail)

	useEffect(() => {
		dispatch(getProductsById(productId));
        setInput({
            id: productId,
            name: productDetail.name,
            description: productDetail.description,
            image_url: productDetail.image_url,
			price: productDetail.price,
			stock: productDetail.stock,
        }); 
	  }, [dispatch,productId,productDetail.name,
		productDetail.description,productDetail.image_url,
		productDetail.price,productDetail.stock]);


	const history = useHistory();

	var categories = useSelector((state) => state.categories);
	categories = categories.map(e=> {
		return {
			value: e._id,
			label: e.name,
		}
	})
  
	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);
  
  const [value, setValue] = useState([])
  //console.log('value is:',value);

	const [input, setInput] = useState({
		name: '',
		description: '',
		image_url: '',
		price: '',
		stock: '',
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

  function onSelectChange(e){
    setValue(e);
    //console.log(e[0].value)
  }

	function handleSubmit(e) {
		e.preventDefault();
    	//setInput({ ...input, input.categories= [789] })
		const dataSend ={
			id: productId,
			name: input.name,
			description: input.description,
			image_url: input.image_url,
			price: input.price,
			stock: input.stock,
			categories: value.map(e => e.value),
		}
		console.log('enviar: ', dataSend);
 		dispatch(updateProduct(dataSend));
		//alert("Categoría creada exitosamente.");
		setInput({
			name: '',
			description: '',
			image_url: '',
			price: '',
			stock: '',
			categories: [],
		});
		history.push('/admin/adminpanel/products'); 
	}

	return (
		<>
		<AdmNav />

		<div className={prdStyle.ProdContent}>
			<fieldset className={prdStyle.ProdFieldset}>
				<legend className={prdStyle.ProdLegend}> Crear Producto </legend>
				<form onSubmit={(e) => { handleSubmit(e); }} >
					<div className={prdStyle.inputs}>
						<label for="name" >Nombre</label>
						<input
							type="text"
							name="name"
							value={input.name}
							onChange={(e) => handleChange(e)}
							placeholder="Nombre Producto nuevo.."
							required
						></input>
						{errors.name && <p className="danger">{errors.name}</p>}
					</div>

					<div className={prdStyle.inputs}>
						<label for="description">Descripcion</label>
						<textarea
							name="description"
							value={input.description}
							onChange={(e) => handleChange(e)}
							placeholder="Descripcion.."
							rows="3"
							required
						></textarea>
						{errors.description && <p className="danger">{errors.description}</p>}
					</div>

					<div className={prdStyle.inputs}>
						<label for="image_url">Imagen URL</label>
						<input
							type="text"
							name="image_url"
							value={input.image_url}
							onChange={(e) => handleChange(e)}
							placeholder="URL de la imagen.."
							required
						></input>
						{errors.image_url && <p className="danger">{errors.image_url}</p>}
					</div>

					<div className={prdStyle.inputs}>
						<label for="price">Precio</label>
						<input
							type="text"
							name="price"
							value={input.price}
							onChange={(e) => handleChange(e)}
							placeholder="Formato: ####.##"
							required
						></input>
						{errors.price && <p className="danger">{errors.price}</p>}
					</div>

					<div className={prdStyle.inputs}>
						<label for="stock">Stock</label>
						<input
							type="text"
							name="stock"
							value={input.stock}
							onChange={(e) => handleChange(e)}
							placeholder="Formato: ####"
							required
						></input>
						{errors.stock && <p className="danger">{errors.stock}</p>}
					</div>

					<div className={prdStyle.ProdSelect}>
						<label for="categories">Categorias</label>
						<Select 
							value={value}
							options={categories}
							onChange={(e) => onSelectChange(e)}
							isMulti
							/>
					</div>

					<div>
						<button className={prdStyle.myButton} type="submit">
							Guardar
						</button>
					</div>
				</form>
			</fieldset>
		</div>
	</>
	);
}
