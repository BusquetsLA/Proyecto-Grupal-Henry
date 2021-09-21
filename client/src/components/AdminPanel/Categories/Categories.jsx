import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { deleteCategory, getCategories, statusChange } from '../../../redux/actions/index';
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
import ctgStyle from './Category.module.css';

export default function AddCategories() {
	const categoriesArr = useSelector((state) => state.categories);
	const loading = useSelector((state) => state.loading);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	if (loading) {
		dispatch(getCategories());
	}

	function handleClickUpdate(e) {
		history.push('/admin/adminpanel/categoriesUpdate/' + e);
	}

	function handleClickDelete(e) {
		swal({
			title:'Eliminar',
			text: 'Estas seguro que deseas borrar la Categoria ?',
			icon: 'warning',
			buttons: ["No", "Si"]
		})
		.then(async (respuesta) => {
			if(respuesta) {
				let message = await dispatch(deleteCategory(e));
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
			<div className={ctgStyle.Catcontent}>
				<div className={ctgStyle.Catcontent2}>
					<div className={ctgStyle.Catcontent3}>
					<NavLink to="/admin/adminpanel/categoriesCreate">
						<Button 
							variant="contained" 
							className={ctgStyle.btn1} 
							disableElevation> <BsFillPlusCircleFill size="1.1em" />&nbsp;Crear Categoria
						</Button>
					</NavLink>
					</div>
					

					<TableContainer style={{marginTop:"10px"}} component={Paper}>
						<Table style={{ backgroundColor: 'white', width: 'auto' }} aria-label="simple table">
							<TableHead className={ctgStyle.tableHead}>
								<TableRow>
									<TableCell style={{ backgroundColor:'var(--color-fondo1)', color: 'white', minWidth: '150px' }}>Categoria</TableCell>
									<TableCell style={{ backgroundColor:'var(--color-fondo4)', color: 'white', minWidth: '400px' }} align="left">
										Detalle
									</TableCell>
									<TableCell style={{ backgroundColor:'var(--color-btnUpdate)', color: 'white', minWidth: '100px' }} align="left">
										Actualizar
									</TableCell>
									<TableCell style={{ backgroundColor:'var(--color-btnDelete)', color: 'white', minWidth: '100px' }} align="left">
										Borrar
									</TableCell>
								</TableRow>
							</TableHead>
						</Table>
					</TableContainer>
				</div>
			</div>

			<TableContainer style={{ marginLeft: '10px', marginTop:'110px' }} component={Paper}>
				<Table style={{ backgroundColor: 'white', width: 'auto' }} aria-label="simple table">
					<TableBody>
						{categoriesArr.map((row) => (
							<TableRow key={row._id}>
								<TableCell component="th" scope="row" style={{ minWidth:'150px' }}>
									{row.name}
								</TableCell>
								<TableCell align="left" style={{ minWidth:'400px' }}>
									{row.products.map((e) => (
										<p>{e.name}</p>
									))}
								</TableCell>
								<TableCell align="right" style={{ minWidth:'100px' }}>
									<Button 
										variant="contained" 
										className={ctgStyle.btnUpdate}
										onClick={(e) => handleClickUpdate(row._id)}
										disableElevation> <BsPencil size="1.1em" /></Button>
								</TableCell>
								<TableCell align="right" style={{ minWidth:'100px' }}>
									<Button 
										variant="contained" 
										className={ctgStyle.btnDelete}
										onClick={(e) => handleClickDelete(row._id)}
										disableElevation> <BsFillTrashFill size="1.1em" /></Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
