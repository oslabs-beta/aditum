/**
 * @description accessibility bar component to allow user to jump focus to different components on screen
 * importing an aria-compliant dropdown package
 * able to target focus with the setSelected option in that package
 * *
 */

import React from 'react';
import Dropdown from 'react-dropdown-aria';
import { withRouter } from 'react-router'

const AccessBar = () => {

  // state initialized to nulls and true for hidden
  const [sectionInfo, setSectionInfo] = useState(null);
  const [navInfo, setNavInfo] = useState(null);
  const [isHidden, setIsHidden] = useState(true);

  // creating the refs to change focus
  const sectionRef = useRef(null);
  const accessBarRef = useRef(null);

  /**
   * @todo change the logic here from id to aria-labelleBy  currently using id setFocus function
   * */
  const setFocus = e => {
    const currentId = sectionInfo[e];
    const currentElement = document.querySelector(`#${currentId}`);
    currentElement.tabIndex = -1;

    sectionRef.current = currentElement;
    sectionRef.current.focus();
  };

  // changeView function
  const changeView = e => {
    const currentPath = navInfo[e];
    const accessLinks = document.querySelectorAll('.accessNavLink');

    accessLinks.forEach(el => {
      if (el.pathname === currentPath) {
        el.click();
      }
    });
  };

  // eventListeners
  let keyDownObj = {};

  document.addEventListener('keydown', e => {
    // adds key value to keyDownObj object upon keydown
    keyDownObj[e.key] = true;
    // if the combination of Alt and / are found in the object, toggle isHidden in state
    if (keyDownObj['Alt'] && (keyDownObj['/'] || keyDownObj['÷'])) {
      if (isHidden) setIsHidden(false); 
      else setIsHidden(true);
    }
  });

  // clear the keyDownObj once keys are no longer actively pressed
  document.addEventListener('keyup', () =>{
    keyDownObj = {};
  });


  // componentDidMount and ComponentDidUpdate logic into a function
  // 




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
  fontSize: '.8em',
  backgroundColor: 'gray',
  fontFamily: 'Roboto',
  color: 'white'
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

// export using withRouter
export default withRouter(AccessBar);