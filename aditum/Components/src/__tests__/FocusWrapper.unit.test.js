import React from 'react';
import Enzyme, { mount } from 'enzyme';
import focusWrapper from '../src/FocusWrapper.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('FocusWrapper component', () => {
  const MockComponent = () => <div />;
  MockComponent.displayName = 'MockComponent';
  
  const WrappedComponent = focusWrapper(MockComponent);

  /**
   * The mount method renders the full DOM including the child components of the parent 
   * component. Since this is a HOC we need to use mount to check that both our wrapper
   * component renders with its child component. Simple mount calls the constructor, 
   * render, and componentDidMount methods.
   */

  const wrapper = mount(<WrappedComponent />);

  it('should render the HOC with mock WrappedComponent', () => {
    expect(wrapper.exists()).toBe(true);
  });
  
});