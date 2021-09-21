import React, { useEffect }         from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory }      from 'react-router-dom';
import { getUsers } from '../../../redux/actions/index';
import {Button, 
		Table, 
		TableBody, 
		TableCell, 
		TableContainer, 
		TableHead, 
		TableRow, 
		Paper } from '@material-ui/core';
import {BsFillTrashFill, BsPencil } from 'react-icons/bs';
import {BiReset } from 'react-icons/bi';
import swal     from 'sweetalert';
import AdmNav   from '../AdmNav';
import usrStyle from './Users.module.css';


export default function AddCategories() {
	const usersArr = useSelector((state) => state.users);
	const loading = useSelector((state) => state.loading);
	const history = useHistory();
	const dispatch = useDispatch();
	//console.log(usersArr)

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	if (loading) {
		dispatch(getUsers());
	}

    function handleClickUpdate(e) {
        history.push('/admin/adminpanel/userUpdate/'+e);
    }

    function handleClickDelete(e) {
		/* swal({
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
		}) */
    } 

	return (
		<>
		<AdmNav />
 		<div className={usrStyle.Prodcontent}>
			<div className={usrStyle.Prodcontent2}>
				<TableContainer style={{marginTop:"10px"}}  component={Paper}>
					<Table style={{backgroundColor:'white', width: 'auto'}} aria-label="simple table">
						<TableHead className={usrStyle.tableHead}>
							<TableRow>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo1)', color:'white', minWidth:'150px' }}>
									Nombre</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo4)', color:'white', minWidth:'250px'}} align="left">
									E-mail</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo1)', color:'white', minWidth:'100px'}} align="left">
									Tipo Admin</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo4)', color:'white', minWidth:'100px'}} align="left">
									Suscrito</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo1)', color:'white', minWidth:'100px'}} align="left">
									Bloqueado</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-fondo4)', color:'white', minWidth:'100px'}} align="left">
									Loegado</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-btnUpdate)', color:'white', minWidth:'100px'}} align="left">
									Actualizar</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-btnDelete)', color:'white', minWidth:'100px'}} align="left">
									Borrar</TableCell>
								<TableCell 
									style={{backgroundColor:'var(--color-btnReset)', color:'white', minWidth:'100px'}} align="left">
									Reset</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</TableContainer>
			</div>
		</div>

		

		<TableContainer style={{ marginLeft: '10px', marginTop:'60px' }} component={Paper}>
			<Table style={{backgroundColor:'white', width: 'auto'}} aria-label="simple table">
				<TableBody>
				 	{usersArr.map((row) => (
						<TableRow key={row._id}>
							<TableCell component="th" scope="row" style={{ width:'150px' }}>
								{row.name} 
							</TableCell>
							<TableCell align="left" scope="row" style={{ width:'250px' }}>
								{row.email} 
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'100px' }}>
								{row.isAdmin ? 'Si' : 'No'} 
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'100px'}}>
								{row.subsribed ? 'Si' : 'No'}
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'100px' }}>
								{row.blocked ? 'Si' : 'No'}
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'90px' }}>
								{row.logged ? 'Si' : 'No'}
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'90px' }}>
								<Button 
									variant="contained" 
									className={usrStyle.btnUpdate}
									onClick={(e) => handleClickUpdate(row._id)}
									disableElevation> <BsPencil size="1.1em" /></Button>
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'100px' }}>
								<Button 
									variant="contained" 
									className={usrStyle.btnDelete}
									onClick={(e) => handleClickDelete(row._id)}
									disableElevation> <BsFillTrashFill size="1.1em" /></Button>
							</TableCell>
							<TableCell component="th" scope="row" style={{ width:'100px' }}>
								<Button 
									variant="contained" 
									className={usrStyle.btnReset}
									onClick={(e) => handleClickDelete(row._id)}
									disableElevation> <BiReset size="1.1em" /></Button>
							</TableCell>
						</TableRow>
					))} 
				</TableBody> 
			</Table>
		</TableContainer> 
		</>
	);
}
