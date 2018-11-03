// @flow
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../URLS';



// Material UI Components
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

// Icons
import Create from '@material-ui/icons/Create';
import Person from '@material-ui/icons/Person';

// Project Components
import List from './layout/List';
import Flex from './layout/Flex';

const styles: Function = (theme) => ({
    root: {
        zIndex: 1600,
        paddingTop: 56,
    },
    urlBtn: {
        minHeight: 58,
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
    },
    text: {
        marginLeft: 10,
    }
});

type URLButtonProps = {
    goTo: Function,
    url: string,
    label: string,
    icon?: any,
}

const URLButton: React.StatelessFunctionalComponent<URLButtonProps> = withStyles(styles)((props: Object) => {
    const {classes} = props;
    return (
        <Flex className={classes.urlBtn} onClick={() => props.goTo(props.url)} justify='center'>
            <Icon>{props.icon}</Icon>
            <Typography className={classes.text} variant='title' color='inherit' align='center'>{props.label}</Typography>
        </Flex>
    )
});

type P = {
    classes: Object,
    goTo: Function,
    isAuthorized: bool,
}


const Sidebar: React.StatelessFunctionalComponent<P> = (props: Object) => {
    const {classes} = props;
    return (
        <List className={classes.root}>
            <URLButton url={URLS.upload} label='Ny nyhet' goTo={props.goTo} icon={<Create />}/>
            {!props.isAuthorized && <URLButton url={URLS.login} label='Login' goTo={props.goTo} icon={<Person />}/>}
        </List>
    )
}

export default withStyles(styles)(Sidebar);

