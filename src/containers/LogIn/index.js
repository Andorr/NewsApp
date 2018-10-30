// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components
import Paper from '@material-ui/core/Paper';

// Project Components
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';
import Navigation from '../../components/Navigation';

type P = {
    classes: Object,
}

const styles: Object = {
    root: {
        maxWidth: 1000,
        margin: 'auto',
        paddingTop: '10%',
        
    },
    content: {
        padding: 28,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '30px',

        '@media only screen and (max-width: 800px)': {
            gridTemplateColumns: '1fr',
            padding: 4,
        }
    },
    paper: {
        

    }
}

class LogIn extends Component<P> {

    render() {
        const {classes} = this.props;
        return (
            <Navigation>
                <div className={classes.root}>
                    <div className={classes.content}>
                        <Paper className={classes.paper} elevation={1} square>
                            <SignUpForm />
                        </Paper>
                        <Paper className={classes.paper} elevation={1} square>
                            <LogInForm />
                        </Paper>

                        
                    </div> 

                </div>
            </Navigation>
        )
    }
}

export default withStyles(styles)(LogIn);