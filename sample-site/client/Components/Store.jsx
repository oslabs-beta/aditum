/**
 * @description store container component that houses products
 * will need to be class component for the react router focus management 
 * 
 * 
 */

 import React, { Component } from 'react';
 import Product from './Product.jsx';
 
 // the store component that will be displayed on route
 export default class Store extends Component {

  // fake state for now 
  constructor() {
    super()

    this.state = {
      loading: true,
    } 
  }


  // lifecycle methods here will focus the updates
  componentDidMount() {
    // will set state to the fetched data from the api
    fetch('/products')
    .then(response => response.json())
    .then(data => {
      console.log('OUR DATA', data);
      this.setState({
        products: data,
        loading: false,
      });
    });
  }
  
  
  render() {
    const { loading, products} = this.state;

    // create products array, and render the fake products
    if (loading) {
      return (
        <h3 aria-labelledby="loading-baby">We loading baby</h3>
      );
    }

    else {
      const productsArr = [];
      for (let i = 0; i < products.length; i += 1) {
        const { id, name, description, price, inventory} = products[i];
        productsArr.push(
        <Product id={id} name={name} description={description} price={price} inventory={inventory}/>
        );
      }

      return (
        <main id='adistore' aria-labelledby='ADISTORE'>
          <h2 className='currentPageTitle'>AdiStore</h2>
          <div className='product_container'>
          { productsArr }
          </div>
        </main>
      )
    }

  }
 }