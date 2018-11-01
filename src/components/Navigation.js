// @flow

import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../URLS';
import classNames from 'classnames';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Service imports
import AuthService from '../store/services/AuthService';
import * as UserSelectors from '../store/reducers/UserReducer';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// Project Components
import Flex from './layout/Flex';

const styles = (theme) => ({
    root: {
        boxSizing: 'border-box',
        color: 'white',
        flexGrow: 1,
    },
    main: {
        marginTop: 64,
        '@media only screen and (max-width: 600px)': {
            marginTop: 56,
        },
    },
    navContent: {
        width: '100%',
    },
    navWrapper: {
        width: '100%',
        maxWidth: 1000,
        margin: 'auto',

        '@media only screen and (max-width: 800px)': {
            padding: '4px 8px',
        }
    },
    menuButton: {
        color: 'white',
    },
    whitesmoke: {
        backgroundColor: 'var(--gray)',
    },
    outlineBtn: {
        border: '2px solid',
        marginLeft: 10,
    },
    white: {
        color: 'white',
    },
    mr: {
        marginRight: 12,
    },
    rightMenu: {
        cursor: 'pointer',
    },
    avatar: {
        border: '2px solid ' + theme.palette.secondary.main,
        cursor: 'pointer',
    },
});

type P = {
    classes: Object,
    isLoading: ?bool,
    children: any,
    noRenderAtLoad: ?bool,
    whitesmoke: ?bool,
    history: Object,
    userInfo?: Object,
}

const RightMenu = withStyles(styles)((props: Object) => (
    <Flex className={props.classes.white}>
        <Button onClick={() => props.goTo(URLS.upload)} variant='text' color='inherit'>New article</Button> 
        {AuthService.isAuthorized() ?
            <Avatar className={props.classes.avatar} onClick={() => props.goTo(URLS.profile)}>{props.userInfo.nickname ? props.userInfo.nickname[0] : 'U'}</Avatar>
            : 
            <Button className={props.classes.outlineBtn} onClick={() => props.goTo(URLS.login)} variant='outlined' color='inherit'>Log in</Button>
        }
    </Flex>
));

const LeftMenu = withStyles(styles)((props: Object) => (
    <Flex className={props.classes.rightMenu} onClick={() => props.goTo(URLS.landing)}>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2000px-Vue.js_Logo_2.svg.png' height={38} alt='logo' />
        <Typography variant='headline' color='inherit'>어떻게</Typography>
    </Flex>
));

class Navigation extends Component<P> {
    

    goTo = (page: string) => {
        this.props.history.push(page);
    }

    componentDidMount() {
        AuthService.fetchUserInfo((err, data) => {

        });
    }

    render() {
        const {classes} = this.props;
        
        return (
            <Fragment>
                <AppBar className={classes.root} position='fixed' color='primary'>
                    <Toolbar className={classes.navContent} disableGutters>
                        <Flex className={classes.navWrapper} justify='space-between'>
                            <LeftMenu goTo={(page) => this.goTo(page)}/>
                            <RightMenu userInfo={this.props.userInfo} goTo={(page) => this.goTo(page)} />
                        </Flex>
                    </Toolbar>
                </AppBar>
               
                <main className={classNames(classes.main, (this.props.whitesmoke) ? classes.whitesmoke : '')}>
                    {(this.props.isLoading)? <LinearProgress /> : null}
                    {(this.props.noRenderAtLoad && this.props.isLoading) ? null :
                        <div className={classes.wrapper}>
                            {this.props.children}
                        </div>
                    }
                </main>
            </Fragment>
          );
    }
}

const mapStateToProps = (state) => ({
    userInfo: UserSelectors.getUserInfo(state),
})

export default connect(mapStateToProps)(withRouter(withStyles(styles)(Navigation)));
