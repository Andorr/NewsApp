// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../../URLS';
import {connect} from 'react-redux';
import {type UserInfo} from '../../types';

// API and service imports
import * as UserSelectors from '../../store/reducers/UserReducer';
import AuthService from '../../store/services/AuthService';
import NewsService from '../../store/services/NewsService';

// Material UI Components
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

// Project Components
import Navigation from '../../components/Navigation';
import List from '../../components/layout/List';
import ArticleItem from './components/ArticleItem';
import Flex from '../../components/layout/Flex';
import FileInput from '../../components/inputs/FileInput';

const styles: Function = (theme) => ({
    root: {
        maxWidth: 1000,
        margin: 'auto',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 100,

        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        gridGap: '16px',

        '@media only screen and (max-width: 800px)': {
            gridTemplateColumns: '1fr',
        }
    },
    details: {
        marginTop: 80,
        border: '1px solid rgba(0,0,0,0.1)',
        maxHeight: 140,
        padding: '80px 12px 12px 12px',
        position: 'relative',
        '@media only screen and (max-width: 800px)': {
            order: 0,
        }
    },
    content: {
        '@media only screen and (max-width: 800px)': {
            order: 1,
        }
    },
    margin: {
        margin: 20,
    },
    avatar: {
        position: 'absolute',
        top: '-74px', left: 0, right: 0,
        margin: 'auto',
        width: 148,
        height: 148,
        border: '3px solid ' + theme.palette.secondary.main,
        cursor: 'pointer',
    },
    gutter: {
        marginTop: 16,
    },
});


type P = {
    classes: Object,
    history: Object,
    userInfo?: UserInfo,
}

type S = {
    isLoading: bool,
    news: Array<Object>,
}

class Profile extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            news: [],
        }
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchNews = async () => {

        this.setState({isLoading: true});
        await AuthService.fetchUserInfo((isError: bool, data: Object) => {

        });
        
        const id: string = this.props.userInfo ? this.props.userInfo.id : '';
        NewsService.fetchNewsByUser(id, (isError: bool, data: Array<Object>) => {
            if(isError === false) {
                this.setState({news: data});
            }
            this.setState({isLoading: false});
        });
    }

    logout = () => {
        AuthService.logout();
        this.props.history.push(URLS.landing);
    }

    goTo = (page) => {
        this.props.history.push(page);
    }

    onImageChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        const inputFile: File = event.target.files[0];
        
        if(inputFile) {
            this.setState({isLoading: true});
            AuthService.uploadProfileImage(inputFile, (isError: bool, user: Object) => {
                this.setState({isLoading: false});
            });
        }
    }

    render() {
        const {classes} = this.props;
        const news = this.state.news || [];
        const firstLetter = this.props.userInfo && this.props.userInfo.nickname ? this.props.userInfo.nickname[0] : 'A';

        const userInfo = this.props.userInfo || {};

        return (
            <Navigation isLoading={this.state.isLoading}>
                <div className={classes.root}>
                    <div className={classes.content}>
                        <Typography variant='display1' gutterBottom>Your articles</Typography>
                        <Divider />

                        <List>
                            {news.map((value) => (
                                <ArticleItem
                                    key={value._id}
                                    title={value.title}
                                    image={value.image}
                                    time={value.created_at}
                                    onClick={() => this.goTo(URLS.upload.concat('/', value._id))}/>
                            ))}
                        </List>
                        {news.length === 0 &&
                            <Typography
                                className={classes.margin}
                                variant='subheading'
                                align='center'>
                                You have no published articles
                            </Typography>
                        }
                    </div>
                    <Flex className={classes.details} dir='column'>
                        <FileInput id='profile-btn-upload' onChange={this.onImageChange}>
                            <Avatar className={classes.avatar} src={userInfo.image}>{(userInfo.image)? null : firstLetter}</Avatar>
                        </FileInput>
                        
                        <Typography className={classes.gutter} variant='caption'>{userInfo.email}</Typography>
                        <Typography className={classes.gutter} variant='caption'>{userInfo.nickname}</Typography>
                        <Button className={classes.gutter} variant='contained' color='secondary' onClick={this.logout}>Log out</Button>
                    </Flex>
                    
                </div>
            </Navigation>
        )
    }
}

const mapStoreToProps: Object = (state) => ({
    userInfo: UserSelectors.getUserInfo(state),
});

export default connect(mapStoreToProps)(withStyles(styles)(Profile));