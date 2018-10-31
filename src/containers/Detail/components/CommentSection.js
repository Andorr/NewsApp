// @flow
import * as React from 'react';
import {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import moment from 'moment';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Project Components
import List, {ListItem} from '../../../components/layout/List';
import Flex from '../../../components/layout/Flex';

const styles: Object = {
    root: {
        width: 'auto',
    },
    inputWrapper: {
        margin: '12px 0',
    },
    item: {
        backgroundColor: 'whitesmoke',
        margin: '8px 0',
        
    },
    fullWidth: {
        width: '100%',
    },
    content: {
        padding: '12px 0',
    }
}

type CommentProps = {
    classes: Object,
    comment: ?string,
    author: ?string,
    timePosted: ?string,
}

const CommentItem : React.StatelessFunctionalComponent<CommentProps> = withStyles(styles)((props) => {
    const {classes} = props;
    return (
        <ListItem className={classes.item}>
            <Flex dir='column' align='flex-start'>
                <Flex className={classes.fullWidth} justify='space-between'>
                    <Typography variant='subheading'><strong>{props.author}</strong></Typography>
                    <div>
                        <Typography variant='caption'>{moment(props.timePosted).calendar()}</Typography>
                    </div>
                </Flex>
                <div className={classes.content}>
                    {props.comment}
                </div>
            </Flex>
           
        </ListItem>
    )
});

type P = {
    classes: Object,
    className?: string,
    onCommentPost?: Function,
    comments?: Array<Object>,
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

    handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
    }

    postComment = (event) => {
        event.preventDefault();

        const comment = this.state.comment;

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



    render() {
        const {classes} = this.props;
        let comments: Array<Object> = (this.props.comments || []).sort((a, b) => b.created_at.localeCompare(a.created_at));
        return (
            <div className={classNames(classes.root, this.props.className)}>
                <Flex justify='space-between'>
                    <Typography variant='title' gutterBottom>Comments</Typography>
                    <Typography variant='subheading' gutterBottom>{comments.length + ' comments'}</Typography>
                </Flex>
                
                <Divider />
                
                
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
                <List>
                    {comments.map((value, index) => (
                        <CommentItem
                            key={value._id}
                            comment={value.comment}
                            author={value.user_nickname}
                            timePosted={value.created_at} />
                    ))}
                    
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(CommentSection);