import React from 'react'
import prodStyle from './Product.module.css';

const Product = ({id, image, name}) => {
    return (
        <div className={prodStyle.card}>
            <img src={image} alt='imagen' />
            <div className={prodStyle.cardData1}>
                <span className={prodStyle.cardText}>{name}</span>
                <span>💎💎💎</span>
            </div>
            <div className={prodStyle.cardData2}>
                <div className={prodStyle.cardPrice}>Price: 123.00</div>
            </div>
        </div>
    )
}

export default Product
