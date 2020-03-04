/**
 * @description store container component that houses products
 */

 import React, { useState, useEffect } from 'react';
 import Product from './Product.jsx';


 const Store2 = () => {
   // hook to set local state and function to update it
   const [loading, setLoading] = useState(true);
   const [products, setProducts] = useState([]);

   // effectively working like componentDidMount
   // the second argument of the empty array prevents multiple re-renders since we only need to fetch the data once
   useEffect(() => {

    fetch('/products')
    .then(response => response.json())
    .then(data => {
      console.log('OUR DATA', data);
      setProducts(data);
      setLoading(false);
    });
   }, []);
   
   if (loading) return <h3 aria-labelledby="loading-baby">We loading baby</h3>;

   // useEffect will run after every render update,
   // meaning it will run when it mounts and after an update

   
   
   // each product fetched is an array of objects
   // map through the products array
    const productsArr = products.map(product => {
     const { id, name, description, price, inventory} = product;

     return (<Product id={id} name={name} description={description} price={price} inventory={inventory}/>);
   });


   return (
    <main id='adistore' aria-labelledby='ADISTORE'>
      <h2 className='currentPageTitle'>AdiStore</h2>
      <div className='product_container'>
      { productsArr }
      </div>
    </main>);
 }

 export default Store2;