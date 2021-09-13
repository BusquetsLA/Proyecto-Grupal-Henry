import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles, Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import { withThemeCreator } from '@material-ui/styles'
//import MenuIcon  from '@material-ui/icons/Menu'

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
            <AppBar position="fixed" color="primary">
              <Toolbar>
{/*                 <IconButton>
                    <MenuIcon 
                        color="inherit" aria-label="menu" 
                        className={classes.menuButton}
                        />
                </IconButton> */}
                <Typography variant="h6" className={classes.tittle} >
                    Panel de Adminstrador
                </Typography>
                
                <NavLink to="/admin/adminpanel" >
                    <Button 
                        variant="contained" 
                        color="primary"
                        size="large"
                        //href="/admin/adminpanel"
                        disableElevation
                    > Home </Button>
                </NavLink>
              </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </div>
    )
}
