import React from 'react';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import {BsCardChecklist, 
        BsArchiveFill, 
        BsFilePost, 
        BsFillPeopleFill, } from 'react-icons/bs';
import AdmNav from './AdmNav';
import admStyle from './Admin.module.css';

export default function AdminPanel() {
	const AdminUrl = '/admin/adminpanel';

	return (
		<div className={admStyle.main}>
			<AdmNav />

			<div className={admStyle.contentGroup}>
				<div className={admStyle.contentBtn}>
					<NavLink to={`${AdminUrl}/categories`}>
						<Button 
                            variant="contained" 
                            className={admStyle.btnMenu} 
                            disableElevation>
							<BsCardChecklist size="1.5em" /> &nbsp; Categorias
						</Button>
					</NavLink>

					<NavLink to={`${AdminUrl}/products`}>
						<Button
							variant="contained"
							className={admStyle.btnMenu}
							disableElevation>
							<BsArchiveFill size="1.5em" /> &nbsp; Productos
						</Button>
					</NavLink>

					<NavLink to="/admin/adminpanel/orders">
						<Button
							variant="contained"
							className={admStyle.btnMenu}
							disableElevation>
							<BsFilePost size="1.5em" /> &nbsp; Ordenes
						</Button>
					</NavLink>

					<NavLink to="/admin/adminpanel/users">
						<Button
							variant="contained"
							className={admStyle.btnMenu}
							disableElevation>
							<BsFillPeopleFill size="1.5em" /> &nbsp; Usuarios
						</Button>
					</NavLink>
				</div>
			</div>
		</div>
	);
}
