import React from 'react'
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    makeStyles, 
    Button } from '@material-ui/core'
import {BsHouseDoorFill,BsSkipStart } from 'react-icons/bs';
import { NavLink, Link } from 'react-router-dom';
import admStyle       from './Orders.module.css'; 
import { useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(1),
      },
    tittle: {
        flexGrow: 1,
        textAlign: "left"
    },
}))

export default function AdmNav() {
    const classes = useStyles()
    const userInfo = useSelector(state => state.userInfo);
    console.log(userInfo);


    return (
        <div>
            <AppBar position="fixed" style={{backgroundColor:" var(--color-fondo1)"}}>
              <Toolbar>
                <Typography variant="h6" className={classes.tittle} >
                    Panel Ordebes del Usuari@ [ {userInfo.email} ]
                </Typography>
                
                <Link to="/shop" >
                    <Button 
                        variant="contained" 
                        className={admStyle.btnNav2}  
                        disableElevation
                    > <BsSkipStart size="1.1em" />&nbsp;Tienda </Button>
                </Link>
                &nbsp;
                <NavLink to="/admin/userpanel/orders" >
                    <Button 
                        variant="contained" 
                        className={admStyle.btnNav} 
                        disableElevation
                    > <BsHouseDoorFill size="1.1em" /> &nbsp; Home </Button>
                </NavLink>
              </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </div>
    )
}
