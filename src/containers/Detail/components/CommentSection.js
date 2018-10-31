// @flow
import * as React from 'react';
import {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Project Components
import List, {ListItem} from '../../../components/layout/List';



const styles: Object = {
    root: {
        width: '100%',
    }
}

type CommentProps = {
    comment: ?string,
}

const CommentItem : React.StatelessFunctionalComponent<CommentProps> = (props) => {
    return (
        <ListItem>
            {props.comment}
        </ListItem>
    )
}

type P = {
    classes: Object,
}

class CommentSection extends Component<P> {

    render() {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root, this.props.className)}>
                <Typography variant='title' gutterBottom>Comments</Typography>
                <Divider />
                <List>
                    <CommentItem comment='Hva faen er den skitn her?'/>
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(CommentSection);