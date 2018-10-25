// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components

// Project Components

type P = {
    classes: Object,
}

const styles: Object = {}

class Template extends Component<P> {

    render() {
        const {classes} = this.props;
        return (
            null
        )
    }
}

export default withStyles(styles)(Template);