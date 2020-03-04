/**
 * @description accessibility bar component to allow user to jump focus to different components on screen
 * importing an aria-compliant dropdown package
 * able to target focus with the setSelected option in that package
 * *
 */

import React, { useState, useEffect, useRef} from 'react';
import Dropdown from 'react-dropdown-aria';

const AccessBar2 = () => {
  const [sectionInfo, setSectionInfo] = useState(null);
  const [isHidden, setIsHidden] = useState(true);

  // creating the refs to change focus
  const sectionRef = useRef(null);
  const accessBarRef = useRef(null);
  
  
  // sets focus on the current page from the 1st dropdown
  const setFocus = e => {
    const currentLabel = sectionInfo[e];
    const currentElement = document.querySelector(`[aria-labelledBy='${currentLabel}']`);
    currentElement.tabIndex = -1;
    sectionRef.current = currentElement;
    // can put a .click() after focus to focus with the enter button
    // works, but gives error
    sectionRef.current.focus();
  };

  // event handler to toggle visibility of AccessBar and set focus to it
  const accessBarHandlerKeyDown = e => {
    if (e.altKey && e.keyCode === 191) {
      if (isHidden) {
        setIsHidden(false)
        accessBarRef.current.focus();
      } else setIsHidden(true);
    }
  }


  /**
   *
   * useEffect hook to add and remove the event handler when 'alt' + '/' are pressed  
   * prior to this, multiple event handlers were being added on each button press 
   * */ 
  useEffect(() => {
    document.addEventListener('keydown', accessBarHandlerKeyDown);
    return () => document.removeEventListener('keydown', accessBarHandlerKeyDown);
  }, [isHidden]);


  /**
   * @todo figure out how to change the dropdown current value after click
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
    
  }, []);
  


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

  // render AccessBar if state has changed to hidden
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
  fontFamily: 'montserrat',
  color: '#373D3F'
};

const dropDownStyle = {
  display: 'flex',
  alignItems: 'center',
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

export default AccessBarNoRouter;