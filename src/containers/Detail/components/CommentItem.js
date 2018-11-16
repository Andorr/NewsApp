// @flow
import * as React from 'react';
import {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import moment from 'moment';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

// Icons
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import Save from '@material-ui/icons/Save';

// Project Components
import {ListItem} from '../../../components/layout/List';
import Flex from '../../../components/layout/Flex';

const styles: Object = {
    item: {
        backgroundColor: 'whitesmoke',
        margin: '8px 0',
        
    },
    fullWidth: {
        width: '100%',
    },
    content: {
        padding: '12px 0',
        width: '100%',
        height: 'auto',
        overflow: 'hidden',
    },
    iconBtn: {
        padding: 4,
        height: 28,
        width: 28,
    },
    mt: {marginTop: 10},
}

type CommentProps = {
    classes: Object,
    id: string,
    comment?: string,
    author?: string,
    timePosted?: string,
    isEdited: bool,
    isOwner: bool,
    onCommentDelete: Function,
    onCommentUpdate: Function,
}

type CommentState = {
    isEditing: bool,
    comment: string,
}

class CommentItem extends Component<CommentProps, CommentState> {

    constructor() {
        super();
        this.state = {
            isEditing: false,
            comment: '',
        }
    }

    toggleEdit = (event: SyntheticEvent<HTMLInputElement>) => {
        // Save
        if(this.state.isEditing && this.props.onCommentUpdate) {
            this.props.onCommentUpdate(this.props.id, this.state.comment);
        }

        this.setState({isEditing: !this.state.isEditing, comment: this.props.comment});
    }

    handleChange = (name) => (event: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({[name]: event.target.value});
    }


    render() {
        const {classes} = this.props;
        const {isEditing} = this.state;
        return (
            <ListItem className={classes.item}>
                <Flex dir='column' align='flex-start'>
                    <Flex className={classes.fullWidth} justify='space-between'>
                        <Typography variant='subheading' color={this.props.isOwner ? 'secondary' : 'default'}><strong>{this.props.author}</strong></Typography>
                        <div>
                            <Typography variant='caption'>{moment(this.props.timePosted).calendar()}</Typography>
                        </div>
                    </Flex>
                    <div className={classes.content} justify='space-between'>
                        {isEditing ?
                                <TextField fullWidth value={this.state.comment} onChange={this.handleChange('comment')}/>
                        :
                            <div>
                                <Typography variant='body2' gutterBottom>{this.props.comment}</Typography>
                                {this.props.isEdited && <Typography variant='caption'>{'Edited'}</Typography>}
                            </div>
                        }
                        <Flex className={classes.mt} justify='flex-end'>
                            {this.props.isOwner && <IconButton className={classes.iconBtn} onClick={this.toggleEdit}>
                                {isEditing ? <Save /> : <Create/>}
                            </IconButton>}
                            {this.props.isOwner && <IconButton className={classes.iconBtn} onClick={this.props.onCommentDelete}><Delete/></IconButton>}
                        </Flex>
                    </div>
                </Flex>
            </ListItem>
        );
    }
    
};

export default withStyles(styles)(CommentItem);