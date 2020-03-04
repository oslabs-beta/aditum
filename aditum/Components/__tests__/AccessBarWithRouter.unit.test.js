import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme';
import AccessBarWithRouter from '../src/AccessBarWithRouter.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/** 
 * @notes As of writing, Enzyme only supports testing using mount to render the wrapper.
 */

describe('AccessBarWithRouter component', () => {
  it('renders hidden h1 upon initial page load (this.state.isHidden = true)', () => {
    const location = { pathname: '/' };
    const wrapper = mount(
      <AccessBarWithRouter location={location}/>
    );
    // if AccessBarWithRouter is hidden it should only render our invisible h1
    expect(wrapper.exists('#hiddenH1')).toEqual(true);
  })
  it('renders full AccessBarWithRouter when this.state.isHidden is false', () => {
    // set dummy location within test to avoid location.pathname is undefined error
    const location = { pathname: '/' };
    const wrapper = mount(
      <AccessBarWithRouter location={location}/>
    );
    wrapper.setState({ isHidden: false }, () => {
      // If AccessBar is not hidden the outermost div of the visible bar should be there
      // Test within setState waits for state change before running test
      expect(wrapper.exists('.ally-nav-area')).toEqual(true);
    });
  });
});


