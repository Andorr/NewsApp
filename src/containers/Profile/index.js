// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../../URLS';
import {connect} from 'react-redux';

// API and service imports
import * as UserSelectors from '../../store/reducers/UserReducer';
import AuthService from '../../store/services/AuthService';
import NewsService from '../../store/services/NewsService';

// Material UI Components
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Project Components
import Navigation from '../../components/Navigation';
import List from '../../components/layout/List';
import ArticleItem from './components/ArticleItem';

const styles: Object = {
    root: {
        maxWidth: 1000,
        margin: 'auto',
        paddingTop: 20,

        display: 'grid',
        gridTemplateColumns: '3fr 1fr',

        '@media only screen and (max-width: 800px)': {
            gridTemplateColumns: '1fr',
        }
    },
}


type P = {
    classes: Object,
    history: Object,
}

type S = {
    news: Array<Object>,
}

class Profile extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            news: [],
        }
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchNews = async () => {

        await AuthService.fetchUserInfo((isError: bool, data: Object) => {

        });
        NewsService.fetchNewsByUser(this.props.userInfo.id, (isError: bool, data: Object) => {
            if(isError === false) {
                this.setState({news: data});
            }
        });
    }

    logout = () => {
        AuthService.logout();
        this.props.history.push(URLS.landing);
    }

    goTo = (page) => {
        this.props.history.push(page);
    }

    render() {
        const {classes} = this.props;
        const news = this.state.news || [];
        return (
            <Navigation>
                <div className={classes.root}>
                    <div>
                        <Typography variant='display1' gutterBottom>Your articles</Typography>
                        <Divider />

                        <List>
                            {news.map((value) => (
                                <ArticleItem
                                key={value._id}
                                
                                title={value.title}
                                onClick={() => this.goTo(URLS.upload.concat('/', value._id))}/>
                            ))}
                        </List>
                    </div>
                    <div>
                        <Button variant='contained' color='secondary' onClick={this.logout}>Log out</Button>
                    </div>
                    
                </div>
            </Navigation>
        )
    }
}

const mapStoreToProps: Object = (state) => ({
    userInfo: UserSelectors.getUserInfo(state),
});

export default connect(mapStoreToProps)(withStyles(styles)(Profile));