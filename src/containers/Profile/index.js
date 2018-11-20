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
import {News} from '../../store/actions/NewsActions';

// Material UI Components
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

// Project Components
import Navigation from '../../components/Navigation';
import List from '../../components/layout/List';
import ArticleItem from './components/ArticleItem';
import Flex from '../../components/layout/Flex';
import FileInput from '../../components/inputs/FileInput';
import Pagination from '../../components/Pagination';

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
    isFetching: bool,
    news: Array<Object>,
}

let page: number = 0;
let noMorePages: bool = false;
class Profile extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            isFetching: false,
            news: [],
        }
    }

    componentDidMount(): void {
        page = 0;
        noMorePages = false;
        this.fetchContent();
    }

    fetchContent = async (): Promise<any> => {
        await AuthService.fetchUserInfo();
        this.fetchNews(true);
    }

    fetchNews = async (isNotFetching: bool = false): Promise<any> => {
        // If already fetching or no more pages, return
        if((this.state.isFetching || noMorePages) && !isNotFetching) {
            return;
        }
        
        if(!isNotFetching) {
            this.setState({isFetching: true});
        }
        
        // Fetch data
        const id: string = this.props.userInfo ? this.props.userInfo.id : '';
        NewsService.fetchNewsWithParams({user: id, page: page}, (isError: bool, data: Array<News>) => {
            if(isError === false) {
                if(data.length === 0) {
                    noMorePages = true; // No more pages left to fetch
                } else {
                    const news: Array<News> = this.state.news;
                    const newData: Array<News> = news.concat(data); // Merge data
                    this.setState({news: newData}); // Merge
                }
                page++;
            }
            this.setState({isLoading: false, isFetching: false});
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
        // Get profile file
        const inputFile: File = event.target.files[0];
        
        if(inputFile) {
            // Upload profile image
            this.setState({isLoading: true});
            AuthService.uploadProfileImage(inputFile, (isError: bool, user: Object) => {
                this.setState({isLoading: false});
            });
        }
    }

    render() {
        const {classes} = this.props;
        const news: Array<News> = this.state.news || [];
        const firstLetter: string = this.props.userInfo && this.props.userInfo.nickname ? this.props.userInfo.nickname[0] : 'A';

        const userInfo = this.props.userInfo || {};

        return (
            <Navigation isLoading={this.state.isLoading}>
                <Pagination onscroll={this.fetchNews}>
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
                                {this.state.isFetching && <CircularProgress className={classes.gutter}/>}
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
                </Pagination>
            </Navigation>
        )
    }
}

const mapStoreToProps = (state) => ({
    userInfo: UserSelectors.getUserInfo(state),
});

// $FlowFixMe
export default connect(mapStoreToProps)(withStyles(styles)(Profile));