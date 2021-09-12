import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteCategory, getCategories } from '../../../redux/actions/index';
import AdmNav from '../AdmNav';
import ctgStyle from './CreateCategory.module.css';

//import { DataGrid } from '@material-ui/data-grid';
//import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'; 


export default function AddCategories() {
	var categoriesArr = useSelector((state) => state.categories);
/* 
	var rows = categoriesArr.map(e => {
		return {
			id: e._id,
			name: e.name,
			products: e.products.map(e => e.name),
			update: '--'
		}
	})
 */

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategories());
	  }, [dispatch]);

	const history = useHistory();

    function handleClickUpdate(e) {
        history.push('/admin/adminpanel/categoriesUpdate/'+e);
      }

    function handleClickDelete(e) {
        dispatch(deleteCategory(e));
        alert("Categoria borrada: "+e)
        history.push('/admin/adminpanel/categories');
      }

	return (
		<>
		<AdmNav />
 		<div className={ctgStyle.Catcontent}>
            {/* <button className={ctgStyle.myButton} type="submit">Crear Categoria</button> */}
            <Button 
                variant="contained" 
                color="primary"
                size="medium"
                href="/admin/adminpanel/categoriesCreate"
                style={{marginTop: '10px'}}
                disableElevation
                > Crear Categoria </Button>
		</div>
		
{/* 		<div style={{ height: 400, width: '100%' }}>
		<DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      	/>
		  </div> */}

 		<TableContainer style={{marginLeft:'20px'}} component={Paper}>
			<Table style={{backgroundColor:'white', width: 'auto'}} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell 
							style={{backgroundColor: 'black', color:'white', width:'150px' }}>
							Categoria</TableCell>
						<TableCell 
							style={{backgroundColor: '#999', color:'white', width:'400px'}} align="left">
							Detalle</TableCell>
						<TableCell 
							style={{backgroundColor: 'black', color:'white', width:'100px'}} align="left">
							Actualizar</TableCell>
						<TableCell 
							style={{backgroundColor: '#999', color:'white', width:'100px'}} align="left">
							Borrar</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
				{categoriesArr.map((row) => (
					<TableRow key={row._id}>
						<TableCell component="th" scope="row">
							{row.name}
						</TableCell>
						<TableCell align="left">
							{row.products.map(e => (
								<p>{e.name}</p>
							))
							}
						</TableCell>
						<TableCell align="right">
							<button className={ctgStyle.myButton2}  onClick={(e) => handleClickUpdate(row._id)}>Actualizar</button>
						</TableCell>
						<TableCell align="right">
							<button className={ctgStyle.myButton3}  onClick={(e) => handleClickDelete(row._id)}>Borrar</button>
						</TableCell>
					</TableRow>
				))}
		        </TableBody>
      		</Table>
    	</TableContainer> 
		</>
	);
}
