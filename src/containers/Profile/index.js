// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../../URLS';

// API and service imports
import AuthService from '../../store/services/AuthService';

// Material UI Components
import Button from '@material-ui/core/Button';

// Project Components
import Navigation from '../../components/Navigation';

type P = {
    classes: Object,
    history: Object,
}

const styles: Object = {
    root: {
        maxWidth: 1000,
        margin: 'auto',
        paddingTop: 20,
    },
}

class Profile extends Component<P> {

    logout = () => {
        AuthService.logout();
        this.props.history.push(URLS.landing);
    }

    render() {
        const {classes} = this.props;
        return (
            <Navigation>
                <div className={classes.root}>
                    <Button variant='contained' color='secondary' onClick={this.logout}>Log out</Button>
                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(Profile);