// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

// API and Service imports
import AuthService from '../../../store/services/AuthService';

// Material UI Components
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';

// Project Components
import PasswordField from '../../../components/inputs/PasswordField';
import Flex from '../../../components/layout/Flex';

type P = {
    classes: Object,
}

type S = {
    isLoading: bool,
    userCreated: bool,

    email: string,
    password: string,
    nickname: string,
    confirmedPassword: string,

    errors: Object,
    errorMessage: string,
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
    mb: {marginBottom: 32,},
    createButton: {
        marginTop: 30,
        display: 'block',
        margin: 'auto',
    },
    progress: {
        minHeight: 500,
    },
}

class SignUpForm extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            userCreated: false,

            email: '',
            nickname: '',
            password: '',
            confirmedPassword: '',

            errors: {email: null, nickname: null, password: null, confirmedPassword: null},
            errorMessage: null,
        };
    }

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    }

    handleToggle = (name) => () => {
        this.setState({[name]: !this.state[name]});
    }

    resetValues = () => {
        this.setState({email: '', nickname: '', password: '', confirmedPassword: ''});
    }

    // For creating a new account
    createAccount = async (event: Object) => {
        event.preventDefault();
        const {email, password, nickname, confirmedPassword} = this.state;

        await this.setState({errors: {email: null, password: null, nickname: null, confirmedPassword: null}});
        // Validate input
        if(!email) {
            this.setState({errors: {...this.state.errors, email: 'No email was provided'}});
            return;
        }
        else if(!nickname) {
            this.setState({errors: {...this.state.errors, nickname: 'No nickname was provided'}});
            return;
        }
        else if(!password) {
            this.setState({errors: {...this.state.errors, password: 'No password was provided'}});
            return;
        }
        else if(password !== confirmedPassword) {
            this.setState({errors: {...this.state.errors, confirmedPassword: 'Confirmed password does not match password'}});
            return;
        }
            
        // Creating new account
        this.setState({isLoading: true});
        AuthService.createAccount(email, password, nickname, (isError, data) => {
            if(!isError) {
                this.setState({userCreated: true, errorMessage: null, });
                this.resetValues();
            } else {
                this.setState({errorMessage: data ? data.message : 'An error occurred'});
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
        } else if (this.state.userCreated) {
            return (
                <Flex className={classes.progress} dir='column' justify='center'>
                    <Typography className={classes.mb} variant='headline' gutterBottom>User was created</Typography>
                    <Button variant='contained' color='primary' onClick={this.handleToggle('userCreated')}>Nice</Button>
                </Flex>
            )
        }

        return (
            <div className={classes.root}>
                <Typography className={classes.mb} variant='headline'>Create your new account</Typography>
                <form className={classes.content} onSubmit={this.createAccount}>
                    <FormControl error >
                    <TextField
                        className={classes.input}
                        label='Email'
                        variant='outlined'
                        error={this.state.errors.email !== null}
                        helperText={this.state.errors.email || ''}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        />
                    </FormControl>
                    <TextField
                        className={classes.input}
                        label='Nickname'
                        variant='outlined'
                        error={this.state.errors.nickname !== null}
                        helperText={this.state.errors.nickname || ''}
                        value={this.state.nickname}
                        onChange={this.handleChange('nickname')}
                        />
                    <PasswordField
                        className={classes.input}
                        label='Password'
                        variant='outlined'
                        error={this.state.errors.password !== null}
                        helperText={this.state.errors.password || ''}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        />
                    <PasswordField
                        className={classes.input}
                        label='Confirm Password'
                        variant='outlined'
                        error={this.state.errors.confirmedPassword !== null}
                        helperText={this.state.errors.confirmedPassword || ''}
                        value={this.state.confirmedPassword}
                        onChange={this.handleChange('confirmedPassword')}
                        />

                    <Typography variant='caption' color='error' gutterBottom>{this.state.errorMessage}</Typography>
                    <Button
                        className={classes.createButton}
                        variant='contained'
                        color='primary'
                        type='submit'>
                        Create account
                    </Button>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(SignUpForm);
