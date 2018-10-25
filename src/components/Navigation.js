// @flow

import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Link from 'react-router-dom/Link';
import URLS from '../URLS';
import classNames from 'classnames';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';


const styles = {
    root: {
        boxSizing: 'border-box',
        color: 'white',
        flexGrow: 1,
    },
    main: {
        marginTop: 64,
        backgroundColor: 'whitesmoke',
        '@media only screen and (max-width: 600px)': {
            marginTop: 56,
        },
    },
    navContent: {
        width: '100%',
    },
    navWrapper: {
        width: '100%',
        padding: '0 10px',
        display: 'flex',
        maxWidth: 1400,
        margin: 'auto',

        alignItems: 'center',

        '@media only screen and (max-width: 600px)': {
            flexDirection: 'row-reverse',
        }
    },
    menuButton: {
        color: 'white',
    },
};

type P = {
    classes: Object,
    isLoading: bool,
    children: any,
}

class Navigation extends Component<P> {
    
    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <AppBar className={classes.root} position='fixed' color='primary'>
                    <Toolbar className={classes.navContent} disableGutters>
                        <div className={classes.navWrapper}>

                        </div>
                    </Toolbar>
                </AppBar>
               
                <main className={classes.main}>
                    {(this.props.isLoading)? <LinearProgress /> : null}
                    <div className={classes.wrapper}>
                        {this.props.children}
                    </div>
                </main>
            </Fragment>
          );
    }
}

export default withStyles(styles)(Navigation);
