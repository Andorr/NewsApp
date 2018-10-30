// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

// Store and API imports
import API from '../../api/api';
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
    },
    voteContent: {
        padding: '16px 0',
    },
    ml: {marginLeft: 10},
}

class Detail extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            isLoading: false,

            news: {},
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const item = this.props.getNewsItem(id);
        console.log(item);

        if(item) {
            this.setState({news: item});
        } else {
            this.setState({isLoading: true});
            const response = API.getNewsById(id).response();
            response.then((data) => {
                console.log(data);
                if(response.isError === false) {
                    this.setState({news: data});
                }
                this.setState({isLoading: false});
            });
        }
        
    }

    render() {
        const {classes} = this.props;
        let {news} = this.state;
        news = news || {};
        const author = news.author || {};

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
                            <Flex className={classes.voteContent} justify='flex-end'>
                                <Typography variant='body2'>{news.vote_count} likes</Typography>
                                <IconButton><Like/></IconButton>
                            </Flex>
                        </div>
                        <div className={classes.textContent}>
                            <MarkdownRenderer value={news.content} />
                        </div>
                    </div>
                </div>
            </Navigation>
        )
    }
}

const mapStoreToProps = (store) => ({
    getNewsItem: (id) => (NewsSelectors.getNewsById(id)(store)),
});

export default connect(mapStoreToProps)(withStyles(styles)(Detail));