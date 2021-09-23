import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { useHistory }                 from 'react-router-dom';
import {Button, 
		Table, 
		TableBody, 
		TableCell, 
		TableContainer, 
		TableHead, 
		TableRow, 
		Paper } from '@material-ui/core';
import { getOrders, getUsers, filterOrders } from '../../../redux/actions/index';
import { BsFileText } from 'react-icons/bs';
import AdmNav         from '../AdmNav';
//import Pagination     from './Pagination'
import Filter         from './Filter'
import ctgStyle       from './Orders.module.css'; 
import {Pagination} from '@material-ui/lab'


export default function Orders() {
	const ordersArr = useSelector((state) => state.orders.orderFiltred);
	const usersArr = useSelector((state) => state.users);
	const loading = useSelector((state) => state.loading);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrders());
		dispatch(getUsers());
	}, [dispatch]);

	if (loading) {
		dispatch(getOrders());
	}

	//Para Paginacion
	const rowsPerPage = 6;
	const [currentPage, setCurrentPage] = useState(1);
	const indexOfLastCard = currentPage * rowsPerPage;
	const idnexOfFirstCard = indexOfLastCard - rowsPerPage;
	const totalPages= Math.ceil(ordersArr.length / rowsPerPage);
	const displayArr = ordersArr.slice(idnexOfFirstCard, indexOfLastCard);

	const paginateFunction = (num) => {
		if(!num) setCurrentPage(currentPage);
		else setCurrentPage(num);
	};
	//--- Fin Paginacion >>

	
	const getUserMail = (e)=>{
		let busca = usersArr.find(b=> b._id===e)
		return busca && busca.email;
	}
	

	function handleDetail(e) {
        history.push('/admin/adminpanel/orderUpdate/'+e);
    }

	function filterFunction(e){
		dispatch(filterOrders(e.target.value));
	}

	return (
		<>
			<AdmNav />
			<div className={ctgStyle.Usrcontent}>
				<div className={ctgStyle.Usrcontent2}>
					<div className={ctgStyle.Usrcontent3}>
						<Filter filterFunction={filterFunction} />
						<div>
							{/* <Pagination totalPages={totalPages} paginateFunction={paginateFunction} /> */}
							<Pagination count={totalPages} onChange={e => paginateFunction(e.target.textContent)} />
						</div>
					</div>

					<TableContainer style={{marginTop:"10px"}} component={Paper} className={ctgStyle.responsiveTable}>
						<Table style={{ backgroundColor: 'white', width: 'auto' }} aria-label="simple table">
							<TableHead className={ctgStyle.tableHead}>
								<TableRow>
									<TableCell style={{ backgroundColor:'var(--color-fondo1)', color: 'white', minWidth: '220px' }}>ID de Orden</TableCell>
									<TableCell style={{ backgroundColor:'var(--color-fondo4)', color: 'white', minWidth: '350px' }} align="left">
										Usuario
									</TableCell>
									<TableCell style={{ backgroundColor:'var(--color-fondo1)', color: 'white', minWidth: '100px' }} align="left">
										Cantidad
									</TableCell>
									<TableCell style={{ backgroundColor:'var(--color-fondo4)', color: 'white', minWidth: '150px' }} align="left">
										Estado
									</TableCell>
									<TableCell style={{ backgroundColor:'var(--color-btnUpdate)', color: 'white', minWidth: '100px' }} align="left">
										Detalle
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
						{displayArr.map((row) => (
							<TableRow key={row._id}>
								<TableCell component="th" scope="row" style={{ width:'220px' }}>
									{row._id}
								</TableCell>
								<TableCell align="left" style={{ minWidth:'350px' }}>
									{getUserMail(row.user_id)}
								</TableCell>
								<TableCell style={{ minWidth: '100px' }} align="left">
									{row.items.length}
								</TableCell>
								<TableCell style={{ minWidth: '150px' }} align="left">
									{row.status}
								</TableCell>
								<TableCell align="right" style={{ minWidth:'100px' }}>
									<Button 
										variant="contained" 
										className={ctgStyle.btnUpdate}
										onClick={(e) => handleDetail(row._id)}
										disableElevation> <BsFileText size="1.9em" /></Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
