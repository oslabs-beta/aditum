/** 
 * @description presentational component for a product will receive props from the store 
 * 
 * @note might have to create a products_container component/ container 
 *
*/
  
import React from 'react';

// pre
const Product = props => {
  

  // display picture 
  // name 
  // product
  // price 
  // button to about page for each product

  const {id, name, description, inventory, price} = props;

  return (
    <div className='product'>
      <p>Product ID: {id}</p>
      <p>{name}</p>
      <p>{description}</p>
      <p>In Stock: {inventory} </p>
      <button type='button' className='buy_button' >Buy now for: {price}</button>
    </div>
  )
}

export default Product;