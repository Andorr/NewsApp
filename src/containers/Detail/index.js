// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import moment from 'moment';
import {type UserInfo} from '../../types';

// Store and API imports
import NewsService from '../../store/services/NewsService';
import AuthService from '../../store/services/AuthService';
import * as NewsSelectors from '../../store/reducers/NewsReducer';
import * as NewsActions from '../../store/actions/NewsActions';
import * as UserSelectors from '../../store/reducers/UserReducer';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

// Icons
import Like from '@material-ui/icons/ThumbUp';

// Project Components
import Navigation from '../../components/Navigation';
import Flex from '../../components/layout/Flex';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import CommentSection from './components/CommentSection';

const styles: Object = {
    root: {
        maxWidth: 1000,
        margin: 'auto',
        paddingTop: 30,
        paddingBottom: 100,
    
        '@media only screen and (max-width: 600px)': {
            padding: 0,
        }
    },
    imageWrapper: {
        width: '100%',
        minHeight: 200,
        maxHeight: 400,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 'auto',
        maxHeight: 400,
        objectFit: 'cover',
    },
    content: {
        display: 'grid',
        gridTemplateAreas: "'title title details' 'text text details'",
        gridTemplateColumns: '1fr 1fr 1fr',

        padding: 28,

        '@media only screen and (max-width: 800px)': {
            gridTemplateColumns: '100%',
            gridTemplateAreas: "'title' 'details' 'text'",
        }
    },
    titleContent: {
        gridArea: 'title',
        paddingBottom: 28,
        overflow: 'hidden',
    },
    title: {
        '@media only screen and (max-width: 800px)': {
            fontSize: '2em'
        }
    },
    subtitle: {
        '@media only screen and (max-width: 800px)': {
            fontSize: '1.2em'
        }
    },
    textContent: {
        gridArea: 'text',
    },
    detailContent: {
        gridArea: 'details',
    },
    authorContent: {
        width: '100%',
        marginBottom: 10,
    },
    voteContent: {
        padding: '16px 0',
    },
    ml: {marginLeft: 10},
    commentSection: {
        padding: 28,
    },
};

type P = {
    classes: Object,
    match: Object,
    getNewsItem: Function,
    setNewsItem: Function,
    setComment: Function,
    deleteComment: Function,
    updateComment: Function,
    userInfo: UserInfo,
}

type S = {
    id: string,
    isLoading: bool,
    isVoting: bool,
}

class Detail extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            isVoting: false,

            id: '',
        };
    }

    componentDidMount() {
        window.scrollTo(0,0);

        const id: string = this.props.match.params.id;
        const item: Object = this.props.getNewsItem(id);

        // If the article is not fetch, fetch from server
        if(!item) {
            this.setState({isLoading: true});
            NewsService.fetchNewsItem(id, (isError: bool, data: Object) => {
                if(isError === false) {
                    this.setState({id: data._id});
                }
                this.setState({isLoading: false});
            });
        } else {
            this.setState({id: id});
        }
    }

    onCommentPost = (comment) => {
        const newsId: string = this.props.match.params.id;
        NewsService.createComment(newsId, comment, (isError: bool, newComment: Object) => {
            if(isError === false) {
                this.props.setComment(newsId, newComment);
            }
        });
    }

    onCommentDelete = (commentId: string) => {
        const newsId: string = this.props.match.params.id;
        NewsService.deleteComment(newsId, commentId, (isError: bool, news: Object) => {
            if(isError === false) {
                this.props.deleteComment(newsId, commentId);
            }
        });
    }

    onCommentUpdate = (commentId: string, comment: string) => {
        const newsId: string = this.props.match.params.id;
        NewsService.updateComment(newsId, commentId, comment, (isError: bool, newComment: Object) => {
            if(isError === false) {
                this.props.setComment(newsId, newComment);
            }
        });
    }

    onLikePost = () => {
        if(this.state.isVoting) {
            return;
        }

        const id: string = this.props.match.params.id;

        // Old news data
        const newsItem: Object = this.props.getNewsItem(this.state.id);
        const isVoted: bool = !newsItem.isVoted;

        this.setState({isVoting: true});
        NewsService.onLikePost(id, (isError: bool, data: Object) => {
            // If voted...
            if(isError === false) {
                // Update news data
                newsItem.isVoted = isVoted;
                newsItem.vote_count = data.vote_count;
                this.props.setNewsItem(newsItem);
            }
            this.setState({isVoting: false});
        });
    }

    render() {
        const {classes} = this.props;
        const news = this.props.getNewsItem(this.state.id) || {};
        const author = news.author || {};
        const published = news.created_at ? moment(news.created_at, ['YYYY-MM-DD HH:mm'], 'nb') : '';

        return (
            <Navigation isLoading={this.state.isLoading}>
                <div className={classes.root}>
                    <div className={classes.imageWrapper}>
                        <img className={classes.image} src={news.image} alt={news.title} />
                    </div>
                    <div className={classes.content}>
                        <div className={classes.titleContent}>
                            <Typography className={classes.title} variant='display2'>{news.title}</Typography>
                            <Typography className={classes.subtitle} variant='headline'>{news.subtitle}</Typography>
                        </div>
                        <div className={classes.detailContent}>
                            <Flex className={classes.authorContent} justify='flex-end'>
                                <Flex dir='column' align='flex-end'>
                                    <Typography variant='title'>{author.nickname || 'Anonym'}</Typography>
                                    <Typography variant='caption'>{author.email}</Typography>
                                </Flex>
                                <Avatar className={classes.ml}>A</Avatar>
                            </Flex>
                            <Flex justify='flex-end'>
                                <Typography variant='caption'>Publisert: {published ? published.format('HH:mm DD.MM.YYYY') : ''}</Typography>
                            </Flex>
                            <Flex className={classes.voteContent} justify='flex-end'>
                            
                                <Typography variant='body2'>{news.vote_count} people like this article</Typography>
                                {AuthService.isAuthorized() && <IconButton
                                    onClick={this.onLikePost}
                                    color={news.isVoted ? 'secondary' : 'default'}
                                    disabled={this.state.isVoting}>
                                    <Like/>
                                </IconButton>}
                            </Flex>
                            
                        </div>
                        <div className={classes.textContent}>
                            <MarkdownRenderer value={news.content} />
                        </div>
                    </div>
                    <CommentSection
                        comments={news.comments}
                        userId={this.props.userInfo.id}
                        isAuthorized={AuthService.isAuthorized()}
                        className={classes.commentSection}
                        onCommentPost={this.onCommentPost}
                        onCommentDelete={this.onCommentDelete}
                        onCommentUpdate={this.onCommentUpdate}/>
                </div>
            </Navigation>
        )
    }
}

const mapStateToProps = (state) => ({
    getNewsItem: (id) => (NewsSelectors.getNewsById(id)(state)),
    userInfo: UserSelectors.getUserInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
    setNewsItem: (item: Object) => dispatch(NewsActions.setNewsItem(item)),
    setComment: (newsId: string, comment: string) => dispatch(NewsActions.setComment(newsId, comment)),
    deleteComment: (newsId: string, commentId: string) => dispatch(NewsActions.deleteComment(newsId, commentId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Detail));