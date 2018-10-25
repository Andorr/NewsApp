// @flow
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

// Material UI Components

// Project Components

type P = {
    classes: Object,
    children: any,
    className: string,
}

const styles: Object = {
    root: {
        display: 'flex',
        alignItems: 'center',
    }
}

const Flex: React.StatelessFunctionalComponent<P> = (props) => {
    const {classes} = props;
    return (
        <div className={classNames(classes.root, props.className)}>
            {props.children}
        </div>
    )
}

export default withStyles(styles)(Flex);