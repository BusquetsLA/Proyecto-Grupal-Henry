import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import styles from "./Carrusel.module.css"


const Carrusel = (props) => {
    var items = [
        {
            name: "No dejes de ver Nuestros Productos Especiales!",
            description: "Probably the most random thing you have ever seen!",
            fondo: "https://res.cloudinary.com/dulpsdgfw/image/upload/v1631467422/Productos%20Madera/PNG/Fondo_Carrusel_tjgy21.png"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            fondo: "https://res.cloudinary.com/dulpsdgfw/image/upload/v1631470344/Productos%20Madera/PNG/Fondo_Carrusel_lamparas_carv8z.png"
        },
        {
            name: "Random Name #3",
            description: "Hello World!",
            fondo: "https://res.cloudinary.com/dulpsdgfw/image/upload/v1632504220/Productos%20Madera/PNG/Imagen_fondo_ymbhfs.png"
        }

    ]
    
    return (
        <div >
     <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>       
        </div>
    )
}
function Item(props)
{
    return (
        <div  >
        <Paper >
            <div className={styles.containerdiv}>
            <img className={styles.cornerimage} src={props.item.fondo} alt="fondo" />
             </div>
        </Paper>
        </div>
    )
}
export default Carrusel
