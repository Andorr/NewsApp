import React from 'react';
import {shallow, mount} from 'enzyme';
import { createShallow , type ReactWrapper } from '@material-ui/core/test-utils';

import Flex from '../../components/layout/Flex';

describe('Flex component', () => {
    let shallow: ReactWrapper;
    
    beforeEach(() => {
        shallow = createShallow();
    });

    it('[Flex] Testing render', () => {
        const component = shallow(<Flex />);
        expect(component).toMatchSnapshot();
    });
});