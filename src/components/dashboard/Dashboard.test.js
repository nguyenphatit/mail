import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
    it('render', () => {
        shallow(<Dashboard />);
    })
})