import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getProductsByName} from '../../redux/actions';
import styles from './SearchBar.module.css';


const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    var products = useSelector((state) => state.products.all);
    
    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        //console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(name !== ""){
        dispatch(getProductsByName(name));
        
        setName("");}
        else{
        alert("Ingresa un nombre para buscar")
        }
    }
    return (
        <div>
             <form onSubmit={handleSubmit} > 
            <div className={styles.searchBar}><input
            className={styles.input} 
            type="text"
            placeholder="Buscar Producto..."
            onChange= {handleInputChange}
            value={name}
            />
            <button  className={styles.boton} type='submit' onClick={handleSubmit}>Buscar Producto</button> 
            </div></form>
        </div>
    )
}

export default SearchBar;

