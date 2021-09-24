import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import { addToDb, getStoredCart } from '../utilites/fakedb';
import './Shop.css'

const Shop = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart] = useState([]);
    const [displayProduct,setDisplayProduct] = useState([]);
    useEffect(()=>{
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setDisplayProduct(data);
        })

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
                // console.log(key , addedProduct);
                if(addedProduct){
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
                
            }
            setCart(storedCart);
        } 
    },[products])

    const handleSearch =  event =>{
        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProduct(matchedProducts);
        console.log(matchedProducts)
    }

    return (
        <div>
            <div className="search-container">
                <input 
                type="text" 
                onChange = {handleSearch}
                placeholder="Search Product" />
            </div>
            <div className="shop-container">
           <div className="product-container">
               <h3>Products: {products.length}</h3>
               {
                   displayProduct.map(product => <Product 
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
        </div>
    );
};

export default Shop;