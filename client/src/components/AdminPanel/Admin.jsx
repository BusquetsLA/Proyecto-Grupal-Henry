import React from 'react';
import admStyle from './Admin.module.css';
import { Button  } from '@material-ui/core';
import AdmNav from './AdmNav';
//import CategoryIcon from '@material-ui/icons/Category';
import { BsCardChecklist, BsArchiveFill, BsFilePost, BsFillPeopleFill } from "react-icons/bs";


export default function AdminPanel() {
    const AdminUrl = "/admin/adminpanel";

    return (
        <div className={admStyle.main}>
            <AdmNav />

            <div className={admStyle.contentGroup}>
            <div className={admStyle.contentBtn}>
            <Button 
                variant="contained" 
                color="secondary"
                size="large"
                href={AdminUrl+"/categories"}
                disableElevation
                >
            {/* <IconButton>
                    <CategoryIcon aria-label="menu" className={admStyle.iconClr} />
                </IconButton>
                <Icon>check-circle</Icon>
                 */}
                <BsCardChecklist size="1.5em" /> &nbsp; Categorias</Button>

            <Button 
                variant="contained" 
                color="secondary"
                size="large"
                href={AdminUrl+"/products"}
                disableElevation
                ><BsArchiveFill size="1.5em" /> &nbsp; Productos</Button>

            <Button 
                variant="contained" 
                color="secondary"
                size="large"
                href={AdminUrl+"/orders"}
                disableElevation
                ><BsFilePost size="1.5em" /> &nbsp; Ordenes</Button>

            <Button 
                variant="contained" 
                color="secondary"
                size="large"
                href={AdminUrl+"/users"}
                disableElevation
                ><BsFillPeopleFill size="1.5em" /> &nbsp; Usuarios</Button>

            </div>
            </div>
        </div>
    )
}
