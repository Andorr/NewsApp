import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import URLS from '../../URLS';
import {mergeElements} from '../../utils';

// Redux and action imports
import NewsService from '../../store/services/NewsService';
import * as NewsSelectors from '../../store/reducers/NewsReducer';

// Project Components
import Navigation from '../../components/Navigation';
import NewsItem from '../../components/NewsItem';
import NewsGroup from './components/NewsGroup';
import LiveFeed from './components/LiveFeed';

const styles: Object = {
    root: {
        maxWidth: 1000,
        margin: 'auto',
        paddingTop: 30,
        paddingBottom: 100,
        minHeight: '100vh',
        
        '@media only screen and (max-width: 1000px)': {
            overflowX: 'hidden',
            paddingTop: 8,
        },
        
    },
    top: {
        marginBottom: 12,
    }
}

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.fetchData();
        
    }

    fetchData = async () => {
        // Fetch news items
        await NewsService.fetchNews();
        await NewsService.getCategories();
        this.setState({isLoading: false});
    }

    render() {
        const {classes, news} = this.props;
        const header = news && news.length > 0 ? news[0] : {};
        const data = mergeElements(6, news, 1);

        return (
            <Navigation isLoading={this.state.isLoading} noRenderAtLoad whitesmoke>
                <LiveFeed data={news}/>
                <div className={classes.root}>
                    <div className={classes.top}>
                        <NewsItem
                            to={URLS.detail.concat('/', header.id)}
                            image={header.image}
                            title={header.title}
                            subtitle={header.subtitle}
                            large
                            highlight='SISTE'/>
                    </div>
                    {data.length > 0 && 
                        data.map((value, i) => (
                            <NewsGroup key={i} data={value} right={i%2 === 0}/>
                        ))
                    }
                </div>
            </Navigation>
        );
    }
}

Landing.propTypes = {
    classes: PropTypes.object,
}

const mapStateToProps = (state) => ({
    news: NewsSelectors.getNews(state),
});

export default connect(mapStateToProps)(withStyles(styles)(Landing));