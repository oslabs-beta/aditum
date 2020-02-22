/**
 * @description accessibility bar component to allow user to jump focus to different components on screen
 * importing an aria-compliant dropdown package
 * able to target focus with the setSelected option in that package
 * 
 * 
 * @todo Be able to show on combination of button presses
 * @todo Conditional rendering inside the render method that initially renders an h1 that tells screen readers how to use the navigation bar
 * 
 * @todo Be able to switch color themes for colorblind/ high contrast 
 * @todo Route handling dropdown for other pages on site
 * @todo Dynamically filling the aria-labels 
 * 
 * 
 * @notes The way the fb accessbar works is that: 
 * 1. first tab shows the bar and focuses to it
 * 2. next tabs exit the fb access bar and moves to correct elements on page
 * 3. to unhide the bar and refocus, press option + '/'
 * 
 * 
 * 
 *
*/


import React, { Component } from 'react';
import Dropdown from 'react-dropdown-aria';
import styles from '../css/dropdown.js';

export default class AccessBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: null,
      // if true render the hidden h1
      // otherwise render the accessibility bar
      isHidden: true,
    }
    this.setFocus = this.setFocus.bind(this);
    this.myRef = React.createRef();
  }

  // method that directs focus to the selected element of the dropdown
  setFocus(e) {
    // grabs id of the associated element in the dropdown
    let currentId = this.state.config[e];
    let currentElement = document.querySelector(`#${currentId}`);
    currentElement.tabIndex = -1;

    // point the created ref to our current element
    this.myRef.current = currentElement;
    this.myRef.current.focus();
  };

  componentDidMount() {
    // adding multiple key down events 
    let keyDownObj = {};

    document.addEventListener('keydown', (event) => {
      keyDownObj[event.key] = true;

      if (keyDownObj['Alt'] && (keyDownObj['/'] || keyDownObj['÷'])) {
        if (this.state.isHidden) {
          this.setState({
            isHidden: false,
          })
        } else {
          this.setState({
            isHidden: true,
          });
        }
      }
    });

    document.addEventListener('keyup', () =>{
      keyDownObj = {};
    });
    
    // adds configurations prop to state
    this.setState({
      config: this.props.config,
    });
  }

  render() {
    // default style, come back later to modularize and add other styles
    const barStyle =  {
      display: 'flex',
      paddingTop: '.1em',
      paddingBottom: '.1em',
      paddingLeft: '5em',
      alignItems: 'center',
      fontSize: '.8em',
      backgroundColor: 'gray',
    };

    // render the hidden h1
    if (this.state.isHidden) {
      const hiddenH1Styles = {
        display: 'block',
        overflow: 'hidden',
        textIndent: '100%',
        whiteSpace: 'nowrap',
        fontSize: '0.01px',
      }
      return <h1 id='hiddenH1' style={hiddenH1Styles}>To enter navigation assistant, press alt + /.</h1>;
    }

    // sets labels for our dropdown menu
    const dropdownKeys = Object.keys(this.props.config);
    const options = [];
    for (let i = 0; i < dropdownKeys.length; i++) {
      options.push({ value: dropdownKeys[i]});
    }

    return (
      <div className ='ally-nav-area' style={ barStyle }>
        <label htmlFor='accessibility-nav-bar'> Jump to: </label>
        <div id='accessibility-nav-bar'>
          <Dropdown
            options={options}
            style={styles}
            placeholder='Sections of this page'
            ariaLabel='Navigation Assistant'
            setSelected={this.setFocus}
          />
        </div>
      </div>
    );
  }
}