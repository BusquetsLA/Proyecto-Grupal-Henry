import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getProductsByName} from '../../redux/actions';
import { AutoSuggest } from 'react-autosuggestions';
import styles from './SearchBar.module.css';
import Select from 'react-select';

const SearchBar = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    // var products = useSelector((state) => state.products.all);
    
    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        //console.log(name)
    }

    var products = useSelector((state) => state.products.all);
	products = products.map(e=> {
		return {
			value: e._id,
			label: e.name,
		}
	})

    function onSelectChange(e){
        setName(e);
        //console.log(e.label)
      }

    function handleSubmit(e){
        // console.log(name)
        e.preventDefault();
        if(name !== ""){
        dispatch(getProductsByName(name.label));
        
        setName("");}
        else{
        alert("Ingresa o Selecciona un producto para buscar")
        }
    }
    return (
        <div>
             <form onSubmit={handleSubmit} > 
            
            <div className={styles.searchBar}>
            {/* <AutoSuggest
            className={styles.auto}
                type="text"
                options={products.map(e=>e.name)}
                handleChange={setName}
                onChange= {handleInputChange}
                value={name}
                placeholder="Buscar Producto..."
            />   */}
            <Select 
							className={styles.input} 
                            value={name}
							options={products}
							onChange={(e) => onSelectChange(e)}
							
							/>  
            {/* <input
            className={styles.input} 
            type="text"
            placeholder="Buscar Producto..."
            onChange= {handleInputChange}
            value={name}
            /> */}
            <button  className={styles.boton} type='submit' onClick={handleSubmit}>Buscar Producto</button> 
            </div></form>
        </div>
    )
}




export default SearchBar;

