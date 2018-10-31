// @flow
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components

// Project Components
import Flex from './Flex';

const styles: Object = {
    padding: {
        padding: 12,
    }
}

type P = {
    classes: Object,
    children: ?any,
    className: ?string,
}

const List: React.StatelessFunctionalComponent<P> = (props: Object) => {
    return (
        <Flex className={props.className}>
            {props.children}
        </Flex>
    )
}

export default (List);

type ListItemProps = {
    classes: Object,
    children: ?any,
}

export const ListItem: React.StatelessFunctionalComponent<ListItemProps> = withStyles(styles)((props: Object) => {
    const {classes} = props;
    return (
        <div className={classes.padding}>
            {props.children}
        </div>
    )
});