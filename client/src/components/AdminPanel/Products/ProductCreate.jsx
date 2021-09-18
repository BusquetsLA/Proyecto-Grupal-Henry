import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch}    from 'react-redux';
import { useHistory, NavLink }        from 'react-router-dom';
import {Button} from '@material-ui/core';
import swal     from 'sweetalert';
import Select   from 'react-select';
import axios    from 'axios';
import AdmNav   from '../AdmNav';
import prdStyle from './Products.module.css';
import { addProduct, getCategories } from '../../../redux/actions/index';
import { BiImageAdd, BiUpload, BiSave, BiArrowToLeft } from 'react-icons/bi';

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

	const [imageSelect, setImageSelect] = useState("")
  	const [imageUpData, setImageUpData] = useState(null)

	function uploadImage () {
		const formData = new FormData();
		formData.append("file", imageSelect)
		formData.append("upload_preset", "e4hxifnb")
	
		axios.post("https://api.cloudinary.com/v1_1/dulpsdgfw/image/upload", formData)
			.then(response => {
				setImageUpData(response)
				if(response.statusText === "OK"){
					//console.log('Result: ', response.data.secure_url)
					setInput({
						...input,
						image_url: response.data.secure_url
					})
				}
				else{
					console.log('Sin respuesta')
				}
			}) 
	}

	function onSelectChange(e){
		setValue(e);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const dataSend ={
			name: input.name,
			description: input.description,
			image_url: input.image_url,
			price: input.price,
			stock: input.stock,
			categories: value.map(e => e.value),
		}
		console.log('enviar: ', dataSend);
		let message = await dispatch(addProduct(dataSend));
		console.log(message.result);
		if(message.result.statusText === "OK"){
			swal({
				title:'Resultado',
				text: message.result.data.message,
				icon: 'success',
				button: "Ok"
			})
			.then(respuesta => {
				if(respuesta) history.push('/admin/adminpanel/products');
			})
		}else{
			swal({
				title:'Resultado',
				text: message.result.data.message,
				icon: 'warning',
				button: "Ok"
			})
		}
		setInput({
			name: '',
			description: '',
			image_url: '',
			price: '',
			stock: '',
			categories: [],
		});
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
						<div className={prdStyle.gridContent}>
							<div className={prdStyle.item1}>
								<label for="file-upload" className={prdStyle.btn2}>
									<BiImageAdd size="2.0rem" /> 
									<span> 
										&nbsp;Seleccionar Imagen 
									</span>
								</label>
								<input type="file"
									id="file-upload"
									onChange={e=> setImageSelect(e.target.files[0]) }
									//onChange={e=> handleSelectImg(e.target.files[0])}
									accept="image/*" />
							</div>
							<div className={prdStyle.item2}>
								<span onClick={uploadImage} className={prdStyle.btn2}>
									<BiUpload size="2.0rem" />
									&nbsp;Cargar Imagen
								</span>
							</div>
							<div className={prdStyle.item3}>
								<img src={input.image_url} alt="imagen" width="120px" height="100px"/>
							</div>
						</div>
							{imageSelect.name ? (
								<span>Seleccionado: {imageSelect.name}, continuar con la carga..</span>
								) : null}
						<input
							type="hidden"
							name="image_url"
							value={input.image_url}
							readonly="readonly"
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

					<div style={{marginTop:"10px"}}>
						<Button 
							variant="contained" 
							className={prdStyle.btnSave}
							type="submit"
							disableElevation>
								<BiSave size="1.3em" />&nbsp;Guardar
						</Button>
						&nbsp; &nbsp;
						<NavLink to={`/admin/adminpanel/products`}>
							<Button 
								variant="contained" 
								className={prdStyle.btn1}
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
