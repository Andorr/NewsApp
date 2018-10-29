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

    justify: ?string,
    align: ?string,
    dir: ?string,
}

const styles: Object = {
    root: {
        display: 'flex',
    }
}

const Flex: React.StatelessFunctionalComponent<P> = (props) => {
    const {classes} = props;
    const flexClass : Object = {
        ...classes,
        justifyContent: props.justify || 'flex-start',
        alignItems: props.align || 'center',
        flexDirection: props.dir || 'row',
    };

    return (
        <div className={classNames(classes.root, props.className)} style={flexClass}>
            {props.children}
        </div>
    )
}

export default withStyles(styles)(Flex);