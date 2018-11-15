// @flow
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

// Material UI Components

// Project Components
import Flex from './Flex';

const styles: Object = {
    item: {
        padding: 12,
        width: '100%',
    }
}

type P = {
    children: ?any,
    className? :string,
}

const List: React.StatelessFunctionalComponent<P> = (props: Object) => {
    return (
        <Flex className={props.className} dir='column'>
            {props.children}
        </Flex>
    );
}

export default (List);

type ListItemProps = {
    classes?: Object,
    children: ?any,
    className?: string,
}

export const ListItem: React.StatelessFunctionalComponent<ListItemProps> = withStyles(styles)((props: Object) => {
    const {classes} = props;
    return (
        <div {...props} className={classNames(classes.item, props.className)}>
            {props.children}
        </div>
    )
});