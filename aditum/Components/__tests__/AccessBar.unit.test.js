import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import AccessBar from '../src/AccessBar.jsx';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('AccessBar component', () => {
  test('renders', () => {
    const wrapper = shallow(<AccessBar />);

    expect(wrapper.exists()).toBe(true);
  })
});
