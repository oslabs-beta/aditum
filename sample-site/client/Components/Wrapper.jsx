import React, { Component } from 'react';

function wrapper(WrappedComponent){
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
  } return accessibility;
}

export default wrapper;
