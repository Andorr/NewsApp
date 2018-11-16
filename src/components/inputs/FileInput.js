// @flow
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components
import Button from '@material-ui/core/Button';

// Icons
import UploadIcon from '@material-ui/icons/CloudUpload';

const styles: Object = {
    smr: {marginRight: 10},
}

type P = {
    classes: Object,
    onChange: Function,
    accept: ?string,
    label: ?string,
    children: ?any,
    id: number,
}

const FileInput: React.StatelessFunctionalComponent<P> = (props) => {
    const {classes} = props;
    return (
        <label htmlFor={props.id || 'button-input-file'}>
            <input
                id={props.id || 'button-input-file'}
                type='file'
                style={{display: 'none'}}
                onChange={props.onChange}
                accept={props.accept || 'image/*'}/>
            {props.children ? props.children :
                <Button component='span' variant='raised' color='secondary'>
                    <UploadIcon className={classes.smr}/>
                    {props.label || 'Upload image'} 
                </Button>
            }
        </label>
    );
}

export default withStyles(styles)(FileInput);