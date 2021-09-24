import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart , faStar } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import Rating from 'react-rating';

const Product = (props) => {
    // console.log(props)
    const {name , img, price, stock, seller, star} = props.product;
    const element = <FontAwesomeIcon icon={faShoppingCart} />
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" srcset="" /> 
            </div>
            
            <div className='details'>
                 <h4 className='product-name'>{name}</h4>
                 <p><small>By: {seller}</small></p>
                 <h3 className='product-price'>Price: ${price}</h3>
                 <p><small>only {stock} left in stock - order soon</small></p>
                 <Rating 
                 initialRating={star}
                 readonly
                 emptySymbol="far fa-star"
                 fullSymbol="fas fa-star icon-color "
                 /> 
                 <br />
                 <button onClick= {()=> props.handleAddToCart(props.product)} className='buy-btn'> {element} add to cart</button>
            </div>
           
        </div>
    );
};

export default Product;