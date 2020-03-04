import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme';
import AccessBarWithRouter from '../src/AccessBarWithRouter.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/** 
 * @notes Components using React Hooks only work with Enzyme's mount as of writing
 */

describe('AccessBarWithRouter component', () => {
  it('renders hidden h1 upon initial page load', () => {
    const location = { pathname: '/' };
    const wrapper = mount(
      <Router>
        <AccessBarWithRouter location={location}/>
      </Router>
  );
    // if AccessBarWithRouter is hidden it should only render our invisible h1
    expect(wrapper.exists('#hiddenH1')).toEqual(true);
  })
});


