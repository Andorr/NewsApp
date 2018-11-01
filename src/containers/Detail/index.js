// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import moment from 'moment';

// Store and API imports
import NewsService from '../../store/services/NewsService';
import * as NewsSelectors from '../../store/reducers/NewsReducer';

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

type P = {
    classes: Object,
    match: Object,
    getNewsItem: Function,
}

type S = {
    news: Object,
    isLoading: bool,
}

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
}

class Detail extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            isVoting: false,

            news: {},
        };
    }

    componentDidMount() {
        window.scrollTo(0,0);

        const id: string = this.props.match.params.id;
        const item: Object = this.props.getNewsItem(id);
        console.log(item);

        // If news item is already fetched, get it
        if(item) {
            this.setState({news: item});
        } else {
            // If not, fetch from server
            this.setState({isLoading: true});
            NewsService.fetchNewsItem(id, (isError: bool, data: Object) => {
                console.log(data);
                if(isError === false) {
                    this.setState({news: data});
                }
                this.setState({isLoading: false});
            });
        }
    }

    onCommentPost = (comment) => {
        const id: string = this.props.match.params.id;
        NewsService.createComment(id, comment, (isError: bool, news: Object) => {
            if(isError === false) {
                this.setState({news: news});
            }
        });
    }

    onLikePost = () => {
        if(this.state.isVoting) {
            return;
        }

        const id: string = this.props.match.params.id;
        const {news} = this.state;
        const isUpvote: bool = news.isVoted === false;

        this.setState({isVoting: true});
        NewsService.onLikePost(id, isUpvote, (isError, data) => {
            if(isError === false) {
                data.isVoted = isUpvote;
                this.setState({news: data});
            }
            this.setState({isVoting: false});
        });
    }

    render() {
        const {classes} = this.props;
        let {news} = this.state;
        news = news || {};
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
                            <Typography variant='display2'>{news.title}</Typography>
                            <Typography variant='headline'>{news.subtitle}</Typography>
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
                            
                                <Typography variant='body2'>{news.vote_count} likes</Typography>
                                <IconButton
                                    onClick={this.onLikePost}
                                    color={news.isVoted ? 'secondary' : 'default'}
                                    disabled={this.state.isVoting}>
                                    <Like/>
                                </IconButton>
                            </Flex>
                            
                        </div>
                        <div className={classes.textContent}>
                            <MarkdownRenderer value={news.content} />
                        </div>
                    </div>
                    <CommentSection
                    comments={news.comments}
                    className={classes.commentSection}
                    onCommentPost={this.onCommentPost}/>
                </div>
            </Navigation>
        )
    }
}

const mapStoreToProps = (store) => ({
    getNewsItem: (id) => (NewsSelectors.getNewsById(id)(store)),
});

export default connect(mapStoreToProps)(withStyles(styles)(Detail));