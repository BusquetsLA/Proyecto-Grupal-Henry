import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles, IconButton } from '@material-ui/core'
import MenuIcon  from '@material-ui/icons/Menu'
import { withRouter } from 'react-router'

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(1),
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
                <Typography variant="h6">
                    Panel de Adminstrador
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </div>
    )
}
