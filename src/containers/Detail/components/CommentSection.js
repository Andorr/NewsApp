// @flow
import * as React from 'react';
import {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

// Type imports
import {Comment} from '../../../store/actions/NewsActions';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Project Components
import List from '../../../components/layout/List';
import Flex from '../../../components/layout/Flex';
import CommentItem from './CommentItem';

const styles: Object = {
    root: {
        width: 'auto',
    },
    inputWrapper: {
        margin: '12px 0',
    },
    mt: {marginTop: 10},
}



type P = {
    classes: Object,
    className?: string,
    onCommentPost?: Function,
    onCommentDelete?: Function,
    onCommentUpdate?: Function,
    comments?: Array<Comment>,
    isAuthorized?: bool,
    userId?: string,
};

type S = {
    comment: string,
};

class CommentSection extends Component<P,S> {

    constructor() {
        super();
        this.state = {
            comment: '',
        }
    }

    handleChange = (name: string) => (event: SyntheticInputEvent<HTMLInputElement>): void => {
        this.setState({[name]: event.target.value});
    }

    postComment = (event: SyntheticEvent<HTMLInputElement>): void => {
        event.preventDefault();

        const comment: string = this.state.comment;

        // Validate comment
        if(!comment || comment.length > 1000) {
            return;
        }

        // Post comment
        if(this.props.onCommentPost) {
            this.props.onCommentPost(comment);
            this.setState({comment: ''});
        }
    }

    onCommentDelete = (id: string) => (event: SyntheticEvent<HTMLInputElement>): void => {
        event.preventDefault();

        // Delete comment
        if(this.props.onCommentDelete) {
            this.props.onCommentDelete(id);
        }
    }

    onCommentUpdate = (commentId: string, comment: string): void => { 
       // Update comment
        if(this.props.onCommentUpdate) {
            this.props.onCommentUpdate(commentId, comment);
        }
    }


    render() {
        const {classes} = this.props;
        let comments: Array<Comment> = (this.props.comments || []).sort((a, b) => b.created_at.localeCompare(a.created_at));
        return (
            <div className={classNames(classes.root, this.props.className)}>
                <Flex justify='space-between'>
                    <Typography variant='title' gutterBottom>Comments</Typography>
                    <Typography variant='subheading' gutterBottom>{comments.length + ' comments'}</Typography>
                </Flex>
                
                <Divider />
                
                {this.props.isAuthorized ?
                <form onSubmit={this.postComment}>
                    <Flex className={classes.inputWrapper} dir='column' align='flex-start'>
                        <TextField
                            variant='outlined'
                            value={this.state.comment}
                            onChange={this.handleChange('comment')}
                            placeholder='Write a comment'
                            margin='normal'
                            fullWidth/>
                        <Button
                            variant='contained'
                            color='secondary'
                            disabled={this.state.comment.length < 2}
                            type='submit'
                            >
                            Submit
                        </Button>
                    </Flex>
                </form>
                :
                <Typography className={classes.mt} variant='body2' gutterBottom>You need to login to create a comment</Typography>
                }
                <List>
                    {comments.map((value: Object, index: number) => (
                        <CommentItem
                            key={value._id}
                            id={value._id}
                            isOwner={this.props.isAuthorized && value.user === this.props.userId}
                            comment={value.comment}
                            author={value.user_nickname}
                            timePosted={value.created_at}
                            isEdited={value.updated_at}
                            onCommentDelete={this.onCommentDelete(value._id)}
                            onCommentUpdate={this.onCommentUpdate}/>
                    ))}
                    
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(CommentSection);