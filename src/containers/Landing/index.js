import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import URLS from '../../URLS';

// API imports
import API from '../../api/api';
import ws from '../../api/ws';

// Redux and action imports
import NewsService from '../../store/services/NewsService';
import * as NewsActions from '../../store/actions/NewsActions';
import * as NewsSelectors from '../../store/reducers/NewsReducer';

// Material UI Components


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
    },
    top: {
        marginBottom: 12,
    }
}

const mergeElements: Function = (num: number, list: Array<Object>, start: number = 2) => {
    const arr = [];
    let from: number = start;
    let to: number = list.length > (num + start) ? (num + start) : list.length;
    while(from < list.length) {
        arr.push(list.slice(from ,to));
        from += num;
        to = (from + num) < list.length ? from + num : list.length;
    }
    return arr;
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

        // Fetch news items
        NewsService.fetchNews((isError, data) => {
            this.setState({isLoading: false});
        });

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.props.dispatch(NewsActions.setNewsItem(data));
        };
    }

    componentWillUnmount() {
        ws.onmessage = null;
    }

    onNewsLike = (value) => () => {
        // Vote
        console.log(value);
        const response = API.voteNews(value.id, true).response();
        response.then((data) => {
            console.log(data);
            if(response.isError === false) {

            }
        });
    }
      
    render() {
        const {classes, news} = this.props;
        const header = news && news.length > 0 ? news[0] : {};
        const data = mergeElements(6, news, 1);
        console.log("HEAD: ", header);
        console.log(data);

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