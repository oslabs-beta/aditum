import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import AccessBar from '../src/AccessBar.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/** 
 *  @notes WrappedComponent is a feature of withRouter that allows us to access the inner HTML elements inside a React component so we can test them.
 * Adding .WrappedComponent allows us to get through the <ContextConsumer> and see the HTML that is rendering.
 * For an example, try removing .WrappedComponent and running console.log(wrapper.debug());
 * See for more information: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md#componentwrappedcomponent
 * @notes A shallow wrapper is what the element renders; a mount wrapper is the component 
 * itself
 */

describe('AccessBar component', () => {
  it('renders hidden h1 upon initial page load (this.state.isHidden = true)', () => {
    const location = { pathname: '/' };
    const wrapper = shallow(
        <AccessBar.WrappedComponent location={location}/>
    );
    expect(wrapper.exists('#hiddenH1')).toEqual(true);
  })
  it('renders full AccessBar when this.state.isHidden is false', () => {
    const location = { pathname: '/' };
    const wrapper = mount(
        <AccessBar.WrappedComponent location={location} />
    );
    wrapper.setState({ isHidden: false }, () => {
      expect(wrapper.exists('.ally-nav-area')).toEqual(true);
    });
  });
});
