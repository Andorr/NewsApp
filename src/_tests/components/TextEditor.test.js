import React from 'react';
import {shallow, mount} from 'enzyme';
import { createShallow , createMount, type ReactWrapper } from '@material-ui/core/test-utils';

// Component imports
import Tabs from '@material-ui/core/Tabs';
import TextEditor, {ToolbarAction} from '../../components/inputs/TextEditor';

describe('Testing TextEditor', () => {
    let shallow;
    let mount;

    beforeEach(() => {
        shallow = createShallow(); // Necassary for Material-UI's "withStyles()"
        mount = createMount();
    });

    it('[TextEditor] Testing render', () => {
        const component = shallow(<TextEditor />);
        expect(component).toMatchSnapshot();
    });

    it('[TextEditor] Testing "appendTextAtCursor()"', () => {
        let value = '';
        const onChange = jest.fn((newValue) => value = newValue);
        const component: ReactWrapper = mount(<TextEditor value={value} onChange={onChange}/>);
        component.find(ToolbarAction).first().simulate('click'); // Should call appendTextAtCursor()
        expect(onChange).toBeCalled();
        expect(value).toBe('### ');
    });

    it('[TextEditor] Testing disablePreview prop', () => {
        const componentWithPreview: ReactWrapper = mount(<TextEditor />);
        expect(componentWithPreview.find(Tabs).exists()).toBeTruthy();
        componentWithPreview.unmount();
        const componentWithoutPreview: ReactWrapper = mount(<TextEditor disablePreview />);
        expect(componentWithoutPreview.find(Tabs).exists()).toBeFalsy();
    });
});