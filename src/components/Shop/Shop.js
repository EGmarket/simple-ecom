import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import { addToDb, getStoredCart } from '../utilites/fakedb';
import './Shop.css'

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([])
    useEffect(()=>{
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    
    const handleAddToCart = (product) => {
        const newCart = [...cart,product]
        setCart(newCart)
        addToDb(product.key)
    }

    useEffect(()=>{
        if(products.length){
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart){
                console.log(savedCart[key])
                const addedProduct = products.find(product => product.key === key);
                console.log(key , addedProduct);
                storedCart.push(addedProduct);
            }
            setCart(storedCart);
        } 
    },[products])

    return (
        <div className="shop-container">
           <div className="product-container">
               <h3>Products: {products.length}</h3>
               {
                   products.map(product => <Product 
                    key={product.key} 
                    product={product}
                    handleAddToCart = {handleAddToCart}
                    ></Product>)
               }
           </div>
           <div className="cart-container">
               <Cart cart = {cart}></Cart>
           </div>
        </div>
    );
};

export default Shop;