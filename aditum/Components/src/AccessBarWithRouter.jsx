/**
 * @description Accessibility bar component to allow user to jump focus to different components on screen. 
 * One dropdown will focus to elements on screen.
 * The other will route you to routes in your navigation bar.
 * 
 * 
 * 
 * 
 */

import React, { useState, useEffect, useRef } from 'react';
import Dropdown from 'react-dropdown-aria';
import { useHistory } from 'react-router-dom';

const AccessBarWithRouter = () => {
  const pathname = useHistory().location.pathname;
  const [sectionInfo, setSectionInfo] = useState(null);
  const [navInfo, setNavInfo] = useState(null);
  const [isHidden, setIsHidden] = useState(true);

  // creating the refs to change focus
  const sectionRef = useRef(null);
  const accessBarRef = useRef(null);
  
  
  // method to set focus to component selected from first dropdown
  const setFocus = e => {
    // sets current label to the aria-labelledby attribute associated with dropdown link
    const currentLabel = sectionInfo[e];
    // finds associated section of the page
    const currentElement = document.querySelector(`[aria-labelledBy='${currentLabel}']`);
    // adding tab index and ref to currentElement so we can jump focus to it
    currentElement.tabIndex = -1;
    sectionRef.current = currentElement;
    sectionRef.current.focus();
  };


  // Changes the page when selecting a link from the 2nd dropdown
  const changeView = e => {
    // accesses the path of the selected navigational link
    const currentPath = navInfo[e];
    // select all of the nav links on the page
    const accessLinks = document.querySelectorAll('.accessNavLink');
    // iterate through nav links to find matching path
    accessLinks.forEach(el => {
      if (el.pathname === currentPath) {
        el.click();
      };
    });
  };

   // event handler to toggle visibility of AccessBar and set focus to it
   const accessBarHandlerKeyDown = e => {
    // checking if both alt key and / key are pressed 
    if (e.altKey && (e.keyCode === 191 || e.keyCode === 246)) {
      // if so, toggle isHidden boolean to conditionally render our access bar
      if (isHidden) {
        setIsHidden(false)
        // immediately shift focus to access bar
        accessBarRef.current.focus();
      } else setIsHidden(true);
    }
  };


  /**
   *
   * useEffect hook to add and remove the event handler when 'alt' + '/' are pressed  
   * prior to this, multiple event handlers were being added on each button press 
   * */ 
  useEffect(() => {
    document.addEventListener('keydown', accessBarHandlerKeyDown);
    // grab all of the React Router Links
    const navNodes = document.querySelectorAll('.accessNavLink');
    const navValues = {};
    navNodes.forEach(el => {
      navValues[el.text] = el.pathname;
    });
    // set state with pertinent Link information
    setNavInfo(navValues);
    return () => document.removeEventListener('keydown', accessBarHandlerKeyDown);
  }, [isHidden]);


  /**
   * useEffect hook to dynamically fill dropdown with content sections
   */
  useEffect(() => {
    //  selects all nodes with the aria attribute aria-labelledby
    setTimeout(() => {
      const ariaNodes = document.querySelectorAll('[aria-labelledby]');
      let sectionValues = {};
  
      ariaNodes.forEach(node => {
        sectionValues[node.getAttribute('aria-labelledby')] = node.getAttribute('aria-labelledby');
      });
  
      setSectionInfo(sectionValues);
    }, 500);
    
  }, [pathname]); // effect runs every time the view changes with a different path
  


  // render hidden h1 based on isHidden
  if (isHidden) return <h1 id='hiddenH1' style={hiddenH1Styles}>To enter navigation assistant, press alt + /.</h1>;

  // function to create dropDownKeys and navKeys 
  const createDropDownValues = dropDownObj => {
    const dropdownKeys = Object.keys(dropDownObj);
    const options = [];
    for (let i = 0; i < dropdownKeys.length; i++) {
      options.push({ value: dropdownKeys[i]});
    }
    return options;
  };

  const sectionDropDown = createDropDownValues(sectionInfo);
  const navInfoDropDown = createDropDownValues(navInfo);

  return (
    <div className ='ally-nav-area' style={ barStyle }>
        <div className = 'dropdown' style={ dropDownStyle }> 
          <label htmlFor='component-dropdown' tabIndex='-1' ref={accessBarRef} > Jump to section: </label>
          <div id='component-dropdown' >
            <Dropdown
              options={ sectionDropDown }
              style={ activeComponentDDStyle }
              placeholder='Sections of this page'
              ariaLabel='Navigation Assistant'
              setSelected={setFocus} 
            />
          </div>
        </div>
          <div className = 'dropdown' style={ dropDownStyle }> 
          <label htmlFor='page-dropdown'> Jump to page: </label>
          <div id='page-dropdown' >
            <Dropdown
              options={ navInfoDropDown }
              style={ activeComponentDDStyle }
              placeholder='Other pages on this site'
              ariaLabel='Navigation Assistant'
              setSelected={ changeView } 
            />
          </div>
        </div>
      </div>
  );
};

/** Style for entire AccessBar */
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
  fontFamily: 'montserrat, Sans-Serif',
  color: '#373D3F'
};

const dropDownStyle = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '1em',
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
};

/** Style for hiddenH1 */
const hiddenH1Styles = {
  display: 'block',
  overflow: 'hidden',
  textIndent: '100%',
  whiteSpace: 'nowrap',
  fontSize: '0.01px',
};

export default AccessBarWithRouter;