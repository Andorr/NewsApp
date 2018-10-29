// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Project Components
import PasswordField from '../../../components/PasswordField';
import Flex from '../../../components/layout/Flex';

type P = {
    classes: Object,
}

type S = {
    news: ?Array<Object>,
}

const styles: Object = {
    root: {
        padding: 36,
        minHeight: 400,
        height: 'auto',
    },
    content: {
       height: '100%',
    },
    flex: {
        height: '100%',
    },
    input: {
        width: '100%',
        marginBottom: 24,
    },
    mb: {
        marginBottom: 64,
    },
    createButton: {
        marginTop: 30,
        display: 'block',
        margin: 'auto',
    }
}

class LogInForm extends Component<P> {

    login = (event) => {
        event.preventDefault();
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <form className={classes.content} onSubmit={this.login}>
                    <Flex className={classes.flex} dir='column'>
                        <Typography className={classes.mb} variant='headline'>Log in</Typography>
                        <TextField className={classes.input} label='Email' variant='outlined' required/>
                        <PasswordField className={classes.input} label='Password' required/>
                        <Button className={classes.createButton} variant='contained' color='primary' type='submit'>Login</Button>
                    </Flex>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(LogInForm);