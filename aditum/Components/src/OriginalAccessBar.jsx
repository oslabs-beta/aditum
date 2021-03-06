/**
 * @description accessibility bar component to allow user to jump focus to different components on screen
 * importing an aria-compliant dropdown package
 * able to target focus with the setSelected option in that package
 * 
 *
*/
import React, { Component } from 'react';
import Dropdown from 'react-dropdown-aria';
import { withRouter } from 'react-router'

class OriginalAccessBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: null,
      navInfo: null,
      // if true render the hidden h1
      // otherwise render the accessibility bar
      isHidden: true,
    }
    this.setFocus = this.setFocus.bind(this);
    this.changeView = this.changeView.bind(this);
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

  // method that changes view via dropdown click
  changeView(e) {
    // finds associated path of clicked element
    let currentPath = this.state.navInfo[e];
    // grabs all of the nav links in the nav bar
    const accessLinks = document.querySelectorAll('.accessNavLinks');
    // loops through to find the matching path
    accessLinks.forEach(el => {
      if (el.pathname === currentPath) {
        // click that nav link
        el.click();
      }
    })
  }

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

    // grabs the nodes from the navigation bar
    const navNodes = document.querySelectorAll('.accessNavLinks')
    
    // initialize empty object for nav links
    const navValues = {};
    // set values for navValues
    navNodes.forEach(el => {
      navValues[el.text] = el.pathname;
    })
    // set navInfo in state to the navValues object
    this.setState({
      navInfo: navValues,
    })

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

    const { config, navInfo } = this.state;

    // sets labels for our dropdown menu
    const dropdownKeys = Object.keys(config);
    const options = [];
    for (let i = 0; i < dropdownKeys.length; i++) {
      options.push({ value: dropdownKeys[i]});
    }

     // sets labels for our dropdown menu
     const navKeys = Object.keys(navInfo);
     const navNames = [];
     for (let i = 0; i < navKeys.length; i++) {
       navNames.push({ value: navKeys[i]});
     }

     return (
      <div className ='ally-nav-area' style={ barStyle }>
        <div className = 'dropdown' style={ dropDownStyle }> 
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
          <div className = 'dropdown' style={ dropDownStyle }> 
          <label htmlFor='page-dropdown'> Jump to page: </label>
          <div id='page-dropdown' >
            <Dropdown
              options={ navNames }
              style={ activeComponentDDStyle }
              placeholder='Other pages on this site'
              ariaLabel='Navigation Assistant'
              setSelected={ this.changeView } 
            />
          </div>
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
  justifyContent: 'flex-start',
  zIndex: '100',
  position: 'sticky',
  top: '0',
  width: '100%',
  fontSize: '.8em',
  backgroundColor: 'lightblue',
  fontFamily: 'montserrat',
  color: '#373D3F'
};

const dropDownStyle = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '1em',
}

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

export default withRouter(OriginalAccessBar);