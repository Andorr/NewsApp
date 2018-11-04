// @flow
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';

// Material UI Components
import ListItem from '@material-ui/core/ListItem';

// Project Components


type P = {
    classes: Object,
    onClick: Function,
    title: string,
}

const styles: Object = {}

const ArticleItem: React.StatelessFunctionalComponent<P> = (props) => {
    //const {classes} = props;
    return (
        <ListItem button onClick={props.onClick}>
            {props.title}
        </ListItem>
    )
}

export default withStyles(styles)(ArticleItem);