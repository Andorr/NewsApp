import React from 'react';
import { createShallow , type ReactWrapper } from '@material-ui/core/test-utils';

import CommentItem from '../../containers/Detail/components/CommentItem';

// Internal components in CommentItem
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Create from '@material-ui/icons/Create';
import Save from '@material-ui/icons/Save';

describe('[CommentItem] component', () => {
    let shallow: ReactWrapper;
    
    beforeEach(() => {
        shallow = createShallow(); // Necassary for Material-UI's "withStyles()"
    });

    it('[CommentItem] Testing comment props', () => {
        const comment = 'Hello, this is a test comment';

        const component = shallow(<CommentItem comment={comment}/>).dive();
        expect(component.find(Typography).findWhere(x => x.text() === comment).length).toBe(1);
    });

    it('[CommentItem] Testing author props', () => {
        const author = 'Jonson';

        const component = shallow(<CommentItem author={author}/>).dive();
        expect(component.containsMatchingElement(<strong>Jonson</strong>)).toBeTruthy();
    });

    it('[CommentItem] Testing "isOwner" props', () => {
        // Should not show any extra buttons
        const component = shallow(<CommentItem />).dive();
        expect(component.find(IconButton).length).toBe(0);
        
        // Should show two extra buttons (edit and delete)
        const ownerComponent = shallow(<CommentItem isOwner={true} />).dive();
        expect(ownerComponent.find(IconButton).length).toBe(2);
    });

    it('[CommentItem] Testing editButton click', () => {
        const component = shallow(<CommentItem isOwner={true} />).dive();

        const createIcon = component.find(Create);
        expect(createIcon.length).toBe(1); // A "create"-icon should appear

        const editButton = createIcon.first().parent();
        expect(editButton.is(IconButton)).toBeTruthy(); // EditButton should be an IconButton

        expect(component.state('isEditing')).toBeFalsy(); // isEditing-state value should be false

        editButton.simulate('click'); // Simulate click on editButton

        expect(component.state('isEditing')).toBeTruthy(); // IsEditing-state value should be true after click
    });

    it('[CommentItem] Testing edit and save comment', () => {
        const oldComment = 'Old comment';
        const newComment = 'New comment';
        const onSave = jest.fn((id: string, value: string) => {});

        const component = shallow(<CommentItem isOwner={true} comment={oldComment} onCommentUpdate={onSave} />).dive();
        component.setState({isEditing: true, comment: newComment});

        expect(component.find(TextField).length).toBe(1); // Should render a textfield component

        const textField = component.find(TextField).first();
        expect(textField.prop('value')).toEqual(newComment); // Textfield should render the new comment

        expect(component.find(Save).length).toBe(1);
        const editButton = component.find(Save).first().parent();

        editButton.simulate('click'); // Should call "onCommentUpdate" method

        expect(component.find(TextField).length).toBe(0); // Should no longer render a textfield component
        expect(component.state('isEditing')).toBeFalsy(); // Should no longer be in edit mode
        expect(onSave).toBeCalled(); // onCommentUpdate-props-method should have been called
    });
});