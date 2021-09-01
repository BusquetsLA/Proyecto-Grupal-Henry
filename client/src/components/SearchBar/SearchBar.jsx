import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
//import {getNameProduct} from '../actions';
import styles from './SearchBar.module.css';
//import axios from "axios";


const SearchBar = () => {
//    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
    }

    // function handleSubmit(e){
    //     e.preventDefault();
    //     if(name !== ""){
    //     dispatch(getNameProduct(name));
    //     setName("");}
    //     else{
    //     alert("Ingresa un nombre para buscar")
    //     }
    // }
    return (
        <div>
             <form > {/* onSubmit={handleSubmit} */}
            <div className={styles.searchBar}><input
            className={styles.input} 
            type="text"
            placeholder="Buscar Producto..."
            onChange= {handleInputChange}
            value={name}
            />
            <button  className={styles.boton} type='submit' >Buscar Producto</button> {/* onClick={handleSubmit}*/}
            </div></form>
        </div>
    )
}

export default SearchBar;

