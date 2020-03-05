import React, { Component } from 'react';
/**
 * Higher order component that takes in a child component and returns a new component with the necessary attributes 
 */


function focusWrapper(WrappedComponent){
  class accessibility extends Component {
    // changes focus 
    componentDidMount(){
      this.myInput.focus();
    }
    // Adds the necessary tags needed to change focus  
    render() {
      return(
        <div tabIndex={-1} ref={(input) => { this.myInput = input}}>
          <WrappedComponent />
        </div>
      )
    }
  } 
  return accessibility;
}

export default focusWrapper;
