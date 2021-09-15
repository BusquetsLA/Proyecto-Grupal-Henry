import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../../redux/actions/index';
import AdmNav from '../AdmNav';
import prdStyle from './Products.module.css';

import { Button } from '@material-ui/core'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'; 


export default function AddCategories() {
	var productsArr = useSelector((state) => state.products.all);
	//console.log(productsArr)

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProducts());
	  }, [dispatch]);

	const history = useHistory();

    function handleClickUpdate(e) {
        history.push('/admin/adminpanel/productUpdate/'+e);
      }

    function handleClickDelete(e) {
        dispatch(deleteProduct(e));
        alert("Producto borrado: "+e)
        history.push('/admin/adminpanel/products');
      } 

	return (
		<>
		<AdmNav />
 		<div className={prdStyle.Prodcontent}>
			<NavLink to="/admin/adminpanel/productCreate" >
            <Button 
                variant="contained" 
                color="primary"
                size="medium"
                style={{marginTop: '10px'}}
                disableElevation
                > Crear Producto </Button>
			</NavLink>
		</div>
		

 		<TableContainer style={{marginLeft:'20px'}} component={Paper}>
			<Table style={{backgroundColor:'white', width: 'auto'}} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell 
							style={{backgroundColor: 'black', color:'white', width:'150px' }}>
							Producto</TableCell>
						<TableCell 
							style={{backgroundColor: '#999', color:'white', width:'300px'}} align="left">
							Categorias</TableCell>
						<TableCell 
							style={{backgroundColor: 'black', color:'white', width:'250px'}} align="left">
							Descripcion</TableCell>
						<TableCell 
							style={{backgroundColor: '#999', color:'white', width:'120px'}} align="left">
							Precio</TableCell>
						<TableCell 
							style={{backgroundColor: 'black', color:'white', width:'80px'}} align="left">
							Stock</TableCell>
						<TableCell 
							style={{backgroundColor: '#999', color:'white', minWidth:'200px'}} align="left">
							Imagen URL</TableCell>
						<TableCell 
							style={{backgroundColor: 'black', color:'white', width:'100px'}} align="left">
							Actualizar</TableCell>
						<TableCell 
							style={{backgroundColor: '#999', color:'white', width:'100px'}} align="left">
							Borrar</TableCell>
					</TableRow>
				</TableHead>
 				<TableBody>
				{productsArr.map((row) => (
					<TableRow key={row._id}>
						<TableCell component="th" scope="row">
							{row.name}
						</TableCell>
						<TableCell align="left">
							{row.categories.map(e => (
								<p>{e.name}</p>
							))
							}
						</TableCell>
						<TableCell component="th" scope="row">
							{row.description}
						</TableCell>
						<TableCell component="th" scope="row">
							{row.price}
						</TableCell>
						<TableCell component="th" scope="row">
							{row.stock}
						</TableCell>
						<TableCell component="th" scope="row">
							<a href={row.image_url} target="blank"> <img src={row.image_url} alt="imagen" width="60px"/> </a> {/*  {row.image_url} */}
						</TableCell>
						<TableCell align="right">
							<button className={prdStyle.myButton2}  onClick={(e) => handleClickUpdate(row._id)}>Actualizar</button>
						</TableCell>
						<TableCell align="right">
							<button className={prdStyle.myButton3}  onClick={(e) => handleClickDelete(row._id)}>Borrar</button>
						</TableCell>
					</TableRow>
				))}
		        </TableBody> 
      		</Table>
    	</TableContainer> 
		</>
	);
}
