// @flow
import * as React from 'react';

// Material UI Components
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

// Project Components

type P = {
    classes: Object,
    label: string,
    variant: ?string,
    value: string,
    onChange: Function,
    icon: ?any,
    data: Array<Object>,
}

const PasswordField: React.StatelessFunctionalComponent<P> = (props) => {
    const data: Array<Object> = props.data || [];
    return (
        <TextField
            {...props}
            select
            label={props.label}
            variant={props.variant || 'outlined'}
            value={props.value}
            onChange={props.onChange}
            >
            {data.map((value, i) => (
                <MenuItem key={value.value} value={value.value}>
                    {value.name || value.value}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default (PasswordField);
