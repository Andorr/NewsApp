// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components

// Project Components
import Navigation from '../../components/Navigation';

type P = {
    classes: Object,
}

type S = {
    news: Object,
}

const styles: Object = {
    root: {
        maxWidth: 1200,
        margin: 'auto',
    },
}

class Detail extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            news: {},
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <Navigation>
                <div className={classes.root}>

                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(Detail);