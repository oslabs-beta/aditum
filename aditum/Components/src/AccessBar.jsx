/**
 * @description accessibility bar component to allow user to jump focus to different components on screen
 * importing an aria-compliant dropdown package
 * able to target focus with the setSelected option in that package
 * 
 * 
 * @todo Be able to show on combination of button presses (done)
 * @todo Conditional rendering inside the render method that initially renders an h1 that tells screen readers how to use the navigation bar (done)
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
 *  Handling dynamic filling
 *  1.Developer should use aria-labelledby to denote sections of the page they want to transfer focus to
 *  2. Can use document.querySelector('[aria-labelledBy]) to grab an element with that attribute
 * 
 * 
 *
*/
import React, { Component } from 'react';
import Dropdown from 'react-dropdown-aria';
import { withRouter } from 'react-router'

class AccessBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: null,
      // if true render the hidden h1
      // otherwise render the accessibility bar
      isHidden: true,
    }
    this.setFocus = this.setFocus.bind(this);
    // creates refs for each section in the dropdown menu
    this.myRef = React.createRef();
    // creates ref for autofocus of access bar
    this.accessBarRef = React.createRef();
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
    // object to store key values that are currently being pressed
    let keyDownObj = {};

    document.addEventListener('keydown', (event) => {
      // adds key value to keyDownObj object upon keydown
      keyDownObj[event.key] = true;

      // if the combination of Alt and / are found in the object, toggle isHidden in state
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

    // clear the keyDownObj once keys are no longer actively pressed
    document.addEventListener('keyup', () =>{
      keyDownObj = {};
    });

    const ariaNodes = document.querySelectorAll('[aria-labelledby]');

    let dropDownValues = {};

    ariaNodes.forEach(node => {
      dropDownValues[node.getAttribute('aria-labelledby')] = node.getAttribute('id');
    });

    // adds configurations prop to state
    this.setState({
      config: dropDownValues,
    });

  }

  // location changes using the withRouter HOC
  componentDidUpdate(newProps) {
    // if access bar is rendered to screen, point focus to the access bar ref
    if (this.state.isHidden === false) {
      this.accessBarRef.current.focus();
    }

    if (this.props.location.pathname !== newProps.location.pathname) {
      setTimeout(() => {
        // able to run the same functionality to change the dropdown
        const ariaNodes = document.querySelectorAll('[aria-labelledby]');
        console.log(ariaNodes);
    
        let dropDownValues = {};
    
        ariaNodes.forEach(node => {
          dropDownValues[node.getAttribute('aria-labelledby')] = node.getAttribute('id');
        });
    
        // adds configurations prop to state
        this.setState({
          config: dropDownValues,
        });
      }, 2000)
  }
  }

  render() {
    // render the hidden h1
    if (this.state.isHidden) { 
      return <h1 id='hiddenH1' style={hiddenH1Styles}>To enter navigation assistant, press alt + /.</h1>;
    }

    const { config } = this.state;

    // sets labels for our dropdown menu
    const dropdownKeys = Object.keys(config);
    const options = [];
    for (let i = 0; i < dropdownKeys.length; i++) {
      options.push({ value: dropdownKeys[i]});
    }

    return (
      <div className ='ally-nav-area' style={ barStyle }>
        <label htmlFor='component-dropdown' tabIndex='-1' ref={this.accessBarRef} > Jump to section: </label>
        <div id='component-dropdown' >
          <Dropdown
            options={ options }
            style={ activeComponentDDStyle }
            placeholder='Sections of this page'
            ariaLabel='Navigation Assistant'
            setSelected={ this.setFocus } 
          />
        </div>
      </div>
    );
  }
}

/** Style for entire AccessBar **/
const barStyle =  {
  display: 'flex',
  paddingTop: '.1em',
  paddingBottom: '.1em',
  paddingLeft: '5em',
  alignItems: 'center',
  zIndex: '100',
  position: 'sticky',
  fontSize: '.8em',
  backgroundColor: 'gray',
};
/** Style for Dropdown component **/
const activeComponentDDStyle = {
  DropdownButton: base => ({
    ...base,
    margin: '5px',
    border: '1px solid',
    fontSize: '.5em',
  }),
  OptionContainer: base => ({
    ...base,
    margin: '5px',
    fontSize: '.5em',
  }),
}
/** Style for hiddenH1 */
const hiddenH1Styles = {
  display: 'block',
  overflow: 'hidden',
  textIndent: '100%',
  whiteSpace: 'nowrap',
  fontSize: '0.01px',
}

export default withRouter(AccessBar);