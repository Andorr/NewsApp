// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import URLS from '../../URLS';
import {mergeElements} from '../../utils';

// Redux and action imports
import NewsService from '../../store/services/NewsService';
import {News, Comment} from '../../store/actions/NewsActions';
import * as NewsSelectors from '../../store/reducers/NewsReducer';

// Material UI components
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Project Components
import Navigation from '../../components/Navigation';
import NewsItem from '../../components/NewsItem';
import NewsGroup from './components/NewsGroup';
import LiveFeed from './components/LiveFeed';
import Pagination from '../../components/Pagination';

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
    },
    progress: {
        display: 'block',
        margin: '16px auto 16px auto',
    }
}

type S = {
    isLoading: bool,
    isFetching: bool,
};

type P = {
    classes: Object,
    news: Array<Object>,
}

let page: number = 0;
let noMorePages: bool = false;
class Landing extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            isFetching: false
        }
    }

    componentDidMount(): void {
        window.scrollTo(0,0);
        // this.resetPage();
        this.fetchData();
    }

    resetPage = (): void => {page = 0;}

    fetchData = async (): Promise<any> => {
        // Fetch news items
        await NewsService.fetchNewsWithParams({importance: 1, page: page});
        await NewsService.getCategories();
        this.setState({isLoading: false});
    }

    fetchNextPage = async (): Promise<any> => {
        // If no more pages to fetch or is already fetching - return
        if(noMorePages || this.state.isFetching) {
            return;
        }

        // Fetch new page
        page = page + 1;
        this.setState({isFetching: true});

        await NewsService.fetchNewsWithParams({importance: 1, page: page})
        .then((data: Array<News>) => {
            if(data && data.length === 0) { // If no more pages left...
                noMorePages = true;         // ...stop fetching
            }
        });

        this.setState({isFetching: false});
    }

    render() {
        const {classes, news} = this.props;
        const header: ?News = news && news.length > 0 ? news[0] : null;
        const data: Array<News> = mergeElements(5, news, 1);

        return (
            <Navigation isLoading={this.state.isLoading} noRenderAtLoad whitesmoke>
                <LiveFeed data={news.slice(0, 5)}/>
                <div className={classes.root}>
                    <div className={classes.top}>
                        {header && <NewsItem
                            to={URLS.detail.concat('/', header.id)}
                            image={header.image}
                            title={header.title}
                            subtitle={header.subtitle}
                            large
                            highlight='SISTE'/>
                        }
                    </div>
                    <Pagination onscroll={this.fetchNextPage}>
                        {data.length > 0 && 
                            data.map((value, i) => (
                                <NewsGroup key={i} data={value} right={i%2 === 0}/>
                            ))
                        }
                    </Pagination>
                    {this.state.isFetching &&
                        <div>
                            <CircularProgress className={classes.progress} />
                        </div>
                    }
                    {noMorePages &&
                        <Typography variant='caption' align='center'>No more articles</Typography>
                    }
                </div>
            </Navigation>
        );
    }
}

const mapStateToProps: Function = (state): Object => ({
    news: NewsSelectors.getNewsByImportance(1)(state),
});

// $FlowFixMe
export default connect(mapStateToProps)(withStyles(styles)(Landing));