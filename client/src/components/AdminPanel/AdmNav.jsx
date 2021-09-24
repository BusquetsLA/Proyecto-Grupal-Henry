import React from 'react'
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    makeStyles, 
    Button } from '@material-ui/core'
import {BsHouseDoorFill } from 'react-icons/bs';
import {GoSignOut } from 'react-icons/go';
import { NavLink, Link } from 'react-router-dom';
import firebase    from "firebase";
import admStyle from './Admin.module.css';
import { useDispatch } from 'react-redux';
import { signout }     from "../../redux/actions/userActions";


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
    const dispatch = useDispatch();

    function handleSignout() {
        firebase.auth().signOut()
        dispatch(signout());
      }

    return (
        <div>
            <AppBar position="fixed" style={{backgroundColor:" var(--color-fondo1)"}}>
              <Toolbar>
                <Typography variant="h6" className={classes.tittle} >
                    Panel de Adminstrador
                </Typography>
                
                <Link to="/shop" onClick={handleSignout}>
                    <Button 
                        variant="contained" 
                        className={admStyle.btnNav2} 
                        disableElevation
                    > <GoSignOut size="1.1em" />&nbsp;Sing Out </Button>
                </Link>
                &nbsp;
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
