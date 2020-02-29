import React from 'react';
import Enzyme, { mount } from 'enzyme';
import focusWrapper from '../src/FocusWrapper.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('FocusWrapper component', () => {
  const MockComponent = () => <div />;
  MockComponent.displayName = 'MockComponent';
  const WrappedComponent = focusWrapper(MockComponent);
  const wrapper = mount(<WrappedComponent />);

  it('should render the HOC', () => {
    expect(wrapper.find('MockComponent').length).toEqual(1);
  });
  
});