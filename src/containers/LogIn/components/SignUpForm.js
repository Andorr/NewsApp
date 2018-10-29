// @flow
import React, {Component, Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

// Project Components
import PasswordField from '../../../components/PasswordField';

type P = {
    classes: Object,
}

type S = {
    news: ?Array<Object>,
}

const styles: Object = {
    root: {
        padding: 36,
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '1fr',
    },
    input: {
        marginBottom: 24,
    },
    mb: {
        marginBottom: 32,
    },
    createButton: {
        marginTop: 30,
        display: 'block',
        margin: 'auto',
    }
}

class SignUpForm extends Component<P> {

    createAccount = (event) => {
        event.preventDefault();

        console.log('Creating account');
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.mb} variant='headline'>Create your new account</Typography>
                <form className={classes.content} onSubmit={this.createAccount}>
                    <FormControl error >
                    <TextField className={classes.input} label='Email' variant='outlined' required/>
                    </FormControl>
                    <TextField className={classes.input} label='Nickname' variant='outlined' required/>
                    <PasswordField className={classes.input} label='Password' variant='outlined' required/>
                    <PasswordField className={classes.input} label='Confirm Password' variant='outlined' required/>
                    <Button className={classes.createButton} variant='contained' color='primary' type='submit'>Create account</Button>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(SignUpForm);
