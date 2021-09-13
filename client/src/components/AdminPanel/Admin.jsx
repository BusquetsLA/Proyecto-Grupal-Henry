import React from 'react';
import admStyle from './Admin.module.css';
import { Button  } from '@material-ui/core';
import AdmNav from './AdmNav';
import { NavLink } from 'react-router-dom';
//import CategoryIcon from '@material-ui/icons/Category';
import { BsCardChecklist, BsArchiveFill, BsFilePost, BsFillPeopleFill } from "react-icons/bs";


export default function AdminPanel() {
    //const AdminUrl = "/admin/adminpanel";
    
    return (
        <div className={admStyle.main}>
            <AdmNav />

            <div className={admStyle.contentGroup}>
            <div className={admStyle.contentBtn}>
            <NavLink to="/admin/adminpanel/categories"  >
            <Button 
                variant="contained" 
                color="secondary"
                size="large"
                className={admStyle.btnMenu}
                disableElevation
                >
            {/* <IconButton>
                    <CategoryIcon aria-label="menu" className={admStyle.iconClr} />
                </IconButton>
                <Icon>check-circle</Icon>
                 */}
                <BsCardChecklist size="1.5em" /> &nbsp; Categorias</Button>
            </NavLink>
            
            <NavLink to="/admin/adminpanel/products" >
            <Button 
                variant="contained" 
                color="secondary"
                size="large"
                className={admStyle.btnMenu}
                //href={AdminUrl+"/products"}
                disableElevation
                ><BsArchiveFill size="1.5em" /> &nbsp; Productos</Button>
            </NavLink>

            <NavLink to="/admin/adminpanel/orders" >
            <Button 
                variant="contained" 
                color="secondary"
                size="large"
                className={admStyle.btnMenu}
                //href={AdminUrl+"/orders"}
                disableElevation
                ><BsFilePost size="1.5em" /> &nbsp; Ordenes</Button>
            </NavLink>

            <NavLink to="/admin/adminpanel/users" >
            <Button 
                variant="contained" 
                color="secondary"
                size="large"
                className={admStyle.btnMenu}
                //href={AdminUrl+"/users"}
                disableElevation
                ><BsFillPeopleFill size="1.5em" /> &nbsp; Usuarios</Button>
            </NavLink>

            </div>
            </div>
        </div>
    )
}
