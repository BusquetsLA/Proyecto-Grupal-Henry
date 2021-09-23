import React, { useEffect }         from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory }      from 'react-router-dom';
import { getProducts, deleteProduct, statusChange } from '../../../redux/actions/index';
import {Button, 
		Table, 
		TableBody, 
		TableCell, 
		TableContainer, 
		TableHead, 
		TableRow, 
		Paper } from '@material-ui/core';
import {BsFillPlusCircleFill, BsFillTrashFill, BsPencil } from 'react-icons/bs';
import swal     from 'sweetalert';
import AdmNav   from '../AdmNav';
import prdStyle from './Products.module.css';


export default function AddCategories() {
	const productsArr = useSelector((state) => state.products.all);
	const loading = useSelector((state) => state.loading);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	if (loading) {
		dispatch(getProducts());
	}

    function handleClickUpdate(e) {
        history.push('/admin/adminpanel/productUpdate/'+e);
    }

    function handleClickDelete(e) {
		swal({
			title:'Eliminar',
			text: 'Estas seguro que deseas borrar el Producto ? ',
			icon: 'warning',
			buttons: ["No", "Si"]
		})
		.then(async (respuesta) => {
			if(respuesta) {
				let message = await dispatch(deleteProduct(e));
				//console.log(message)
				dispatch(statusChange());
				swal({
					title:'Aviso',
					text: message.result.data.message,
					icon: 'success',
					button: "Ok"
				}) 
			}
		})
    } 

	return (
		<>
		<AdmNav />
 		<div className={prdStyle.Prodcontent}>
			 <div className={prdStyle.Prodcontent2}>
				<div className={prdStyle.Prodcontent3}>
					<NavLink to="/admin/adminpanel/productCreate" >
					<Button 
						variant="contained" 
						className={prdStyle.btn1} 
						disableElevation> <BsFillPlusCircleFill size="1.1em" />&nbsp;Crear Producto
					</Button>
					</NavLink>
				</div>

				<TableContainer style={{marginTop:"10px"}}  component={Paper}>
					<Table style={{backgroundColor:'white', width: 'auto'}} aria-label="simple table">
						<TableHead className={prdStyle.tableHead}>
							<TableRow>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo1)', color:'white', minWidth:'150px' }}>
									Producto</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo4)', color:'white', minWidth:'150px'}} align="left">
									Categorias</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo1)', color:'white', minWidth:'250px'}} align="left">
									Descripcion</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo4)', color:'white', minWidth:'150px'}} align="left">
									Precio</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo1)', color:'white', minWidth:'100px'}} align="left">
									Stock</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo4)', color:'white', minWidth:'100px'}} align="left">
									Imagen</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-btnUpdate)', color:'white', minWidth:'100px'}} align="left">
									Actualizar</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-btnDelete)', color:'white', minWidth:'100px'}} align="left">
									Borrar</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</TableContainer>
			</div>
		</div>

		

		<TableContainer style={{ marginLeft: '10px', marginTop:'110px' }} component={Paper}>
			<Table style={{backgroundColor:'white', width: 'auto'}} aria-label="simple table">
				<TableBody>
					{productsArr.map((row) => (
						<TableRow key={row._id}>
							<TableCell component="th" scope="row" style={{ width:'150px' }}>
								{row.name} 
							</TableCell>
							<TableCell align="left" scope="row" style={{ width:'150px' }}>
								{row.categories.map(e => (
									<p>{e.name}</p>
								))
								}
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'250px' }}>
								<textarea className={prdStyle.txtArea} readOnly>{row.description}</textarea> 
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'150px'}}>
								{row.price} 
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'100px' }}>
								{row.stock}
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'90px' }}>
								<a href={row.image_url} target="blank"> <img src={row.image_url} alt="imagen" width="60px"/> </a> {/*  {row.image_url} */}
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'90px' }}>
								<Button 
									variant="contained" 
									className={prdStyle.btnUpdate}
									onClick={(e) => handleClickUpdate(row._id)}
									disableElevation> <BsPencil size="1.1em" /></Button>
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'100px' }}>
								<Button 
									variant="contained" 
									className={prdStyle.btnDelete}
									onClick={(e) => handleClickDelete(row._id)}
									disableElevation> <BsFillTrashFill size="1.1em" /></Button>
								{/* <button className={prdStyle.myButton3}  onClick={(e) => handleClickDelete(row._id)}>b</button> */}
							</TableCell>
						</TableRow>
					))}
				</TableBody> 
			</Table>
		</TableContainer> 
		</>
	);
}
