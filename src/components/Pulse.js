// @flow
import * as React from 'react';
import className from 'classnames';
import {withStyles} from '@material-ui/core/styles';

// Project Components
import Flex from './layout/Flex';

type P = {
    classes: Object,
    children: ?any,
    className: string,
    label: ?string,
}

const styles: Object = {
    root: {
        backgroundColor: 'rgb(151, 41, 41)',
    },
    square: {
        borderRadius: 0,
    },
    content: {
        padding: 8,
        
        color: 'white',
    }
}

const Pulse: React.StatelessFunctionalComponent<P> = (props) => {
    const {classes} = props;
    return (
        <div className={className(classes.root, 'pulse', (props.label || props.children) ? classes.square : '', props.className)}>
            {(props.label || props.children) &&
                <Flex className={classes.content}>
                    {props.label}
                    {props.children}
                </Flex>
            }
        </div>
    )
}

export default withStyles(styles)(Pulse);