// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import URLS from '../../../URLS';

// API and Service imports
import AuthService from '../../../store/services/AuthService';

// Material UI Components
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Project Components
import PasswordField from '../../../components/inputs/PasswordField';
import Flex from '../../../components/layout/Flex';

type P = {
    classes: Object,
    history: any,
}

type S = {
    isLoading: bool,
    email: string,
    password: string,
    errors: Object,
    errorMessage: string,
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
    },
    progress: {
        minHeight: 400,
    },
}

class LogInForm extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            isLoading: false,

            email: '',
            password: '',

            errors: {
                email: null,
                password: null,
            },
            errorMessage: null,
        };
    }

    handleChange = (name: string) => (event: Object) => {
        this.setState({[name]: event.target.value});
    }

    login = (event: Object) => {
        event.preventDefault();

        const email = this.state.email;
        const password = this.state.password;

        // Validate
        this.setState({errors: {email: null, password: null, errorMessage: null}});
        if(!email) {
            this.setState({errors: {...this.state.errors, email: 'No email is provided'}});
            return;
        } 
        else if(!password) {
            this.setState({errors: {...this.state.errors, password: 'No password is provided'}});
            return;
        }
        
        // Log in
        this.setState({isLoading: true});
        AuthService.login(email, password, (error, data) => {
            if(!error) {
                this.props.history.push(URLS.landing);
            } else {
                this.setState({errorMessage: 'Email or password was incorrect'});
            }
            this.setState({isLoading: false});
        });
    }

    render() {
        const {classes} = this.props;

        if(this.state.isLoading) {
            return (
                <Flex className={classes.progress} justify='center'>
                    <CircularProgress />
                </Flex>
            )
        }

        return (
            <div className={classes.root}>
                <form className={classes.content} onSubmit={this.login}>
                    <Flex className={classes.flex} dir='column'>
                        <Typography className={classes.mb} variant='headline'>Log in</Typography>
                        <TextField
                            className={classes.input}
                            label='Email'
                            error={this.state.errors.email !== null}
                            helperText={this.state.errors.email || ''}
                            variant='outlined'
                            value={this.state.email}
                            onChange={this.handleChange('email')}/>
                        <PasswordField
                            className={classes.input}
                            label='Password'
                            error={this.state.errors.password !== null}
                            helperText={this.state.errors.password || ''}
                            value={this.state.password}
                            onChange={this.handleChange('password')}/>
                        <Typography variant='caption' color='error'>{this.state.errorMessage}</Typography>
                        <Button className={classes.createButton} variant='contained' color='primary' type='submit'>Login</Button>
                    </Flex>
                </form>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(LogInForm));