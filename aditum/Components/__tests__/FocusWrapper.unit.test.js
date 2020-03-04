import React from 'react';
import Enzyme, { mount } from 'enzyme';
import focusWrapper from '../src/FocusWrapper.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/** 
 * @notes The mount method renders the full DOM including the child components of the parent 
 * component. Since this is a HOC we need to use mount to check that both our wrapper
 * component renders with its child component. Simple mount calls the constructor, 
 * render, and componentDidMount methods.
 */

describe('FocusWrapper component', () => {
  const MockComponent = () => <h1>I am being wrapped and focused on</h1>;
  MockComponent.displayName = 'MockComponent';
  const WrappedComponent = focusWrapper(MockComponent);
  const wrapper = mount(<WrappedComponent />);

  it('should render a div around the WrappedComponent', () => {
    expect(wrapper.exists('div')).toEqual(true);
  }); 
});