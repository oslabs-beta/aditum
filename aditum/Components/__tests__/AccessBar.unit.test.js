import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import AccessBar from '../src/AccessBar.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/** 
 * @notes WrappedComponent is a feature of withRouter that allows us to access the inner HTML elements inside a React component so we can test them.
 * Adding .WrappedComponent allows us to get through the <ContextConsumer> and see the HTML that is rendering.
 * For an example, try removing .WrappedComponent and running console.log(wrapper.debug());
 * See for more information: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md#componentwrappedcomponent
 * @notes A shallow wrapper is what the element renders; a mount wrapper is the component 
 * itself
 */

describe('AccessBar component', () => {
  it('renders hidden h1 upon initial page load (this.state.isHidden = true)', () => {
    // set dummy location within test to avoid location.pathname is undefined error
    const location = { pathname: '/' };
    const wrapper = shallow(
      <AccessBar.WrappedComponent location={location}/>
  );
    // if AccessBar is hidden it should only render our invisible h1
    expect(wrapper.exists('#hiddenH1')).toEqual(true);
  })
  it('renders full AccessBar when this.state.isHidden is false', () => {
    // set dummy location within test to avoid location.pathname is undefined error
    const location = { pathname: '/' };
    const wrapper = mount(
        <AccessBar.WrappedComponent location={location} />
    );
    wrapper.setState({ isHidden: false }, () => {
      // If AccessBar is not hidden the outermost div of the visible bar should be there
      // Test within setState waits for state change before running test
      expect(wrapper.exists('.ally-nav-area')).toEqual(true);
    });
  });
});


