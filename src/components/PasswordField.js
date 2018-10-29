// @flow
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

// Icons
import Security from '@material-ui/icons/Security';

// Project Components

type P = {
    classes: Object,
    label: ?string,
    variant: ?string,
    value: string,
    onChange: Function,
}

type S = {
    news: ?Array<Object>,
}

const styles: Object = {}


const PasswordField: React.StatelessFunctionalComponent<P> = (props) => {
    const {classes} = props;
    return (
        <TextField
            {...props}
            label={props.label || 'Password'}
            variant={props.variant || 'outlined'}
            value={props.value}
            onChange={props.onChange}
            type='password'
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Security />
                  </InputAdornment>
                ),
              }}>
        </TextField>
    )
}

export default withStyles(styles)(PasswordField);

