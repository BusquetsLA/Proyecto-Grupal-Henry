import React from 'react';
import admStyle from './Admin.module.css';
import Button from '@material-ui/core/Button';
import AdmNav from './AdmNav';

export default function AdminPanel() {
    return (
        <div className={admStyle.main}>
            <AdmNav />
           
            <Button 
                variant="contained" 
                color="secondary"
                size="medium"
                href="/"
                disableElevation
                >
            Categorias</Button>
        </div>
    )
}
