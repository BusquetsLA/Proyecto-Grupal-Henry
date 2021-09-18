import React from 'react'
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    makeStyles, 
    Button } from '@material-ui/core'
import {BsHouseDoorFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import admStyle from './Admin.module.css';


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
    return (
        <div>
            <AppBar position="fixed" style={{backgroundColor:" var(--color-fondo1)"}}>
              <Toolbar>
                <Typography variant="h6" className={classes.tittle} >
                    Panel de Adminstrador
                </Typography>
                
                <NavLink to="/admin/adminpanel" >
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
