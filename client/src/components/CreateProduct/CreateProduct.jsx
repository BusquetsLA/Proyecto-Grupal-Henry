import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addProduct, getCategories } from '../../redux/actions/index';
import ctgStyle from './CreateProduct.module.css';
import Select from 'react-select';

export function validate(input) {
	let errors = {};
	if (!input.name) errors.name = 'El nombre de la categoría es obligatorio.';
	else if (!/([A-Z]|[a-z])\w+/.test(input.name)) errors.name = 'El nombre de la categoría es inválido.';

	if (!input.description) errors.description = 'La descripcion es obligatoria.';
	else if (!/([A-Z]|[a-z])\w+/.test(input.description)) errors.description = 'El nombre de la descripcion es inválido.';

	if (!input.imgurl) errors.imgurl = 'La URL de la imagen es obligatoria';
	else if (
		!/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/.test(
			input.imgurl,
		)
	)
		errors.imgurl = 'El formato de la URL no es correcto..';

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
      //categories: [...input.categories, 456],
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
      name: input.name,
      description: input.description,
			image_url: input.image_url,
			price: input.price,
			stock: input.stock,
      categories: value.map(e => e.value),
    }
		console.log('enviar: ', dataSend);
 		dispatch(addProduct(input));
		//alert("Categoría creada exitosamente.");
		setInput({
			name: '',
			description: '',
			image_url: '',
			price: '',
			stock: '',
			categories: [],
		});
		history.push('/admin/prdcreate'); 
	}

	return (
		<div className={ctgStyle.ProdContent}>
			<fieldset className={ctgStyle.ProdFieldset}>
				<legend> Crear Producto </legend>
				<form onSubmit={(e) => { handleSubmit(e); }} >
					<div className={ctgStyle.inputs}>
						<label for="name">Nombre</label>
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

					<div className={ctgStyle.inputs}>
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

					<div className={ctgStyle.inputs}>
						<label for="imgurl">Imagen URL</label>
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

					<div className={ctgStyle.inputs}>
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

					<div className={ctgStyle.inputs}>
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

					<div className={ctgStyle.ProdSelect}>
						<label for="categories">Categorias</label>
						<Select 
              value={value}
              options={categories}
              onChange={(e) => onSelectChange(e)}
              isMulti
            />
					</div>

					<div>
						<button className={ctgStyle.myButton} type="submit">
							Guardar
						</button>
					</div>
				</form>
			</fieldset>
		</div>
	);
}
