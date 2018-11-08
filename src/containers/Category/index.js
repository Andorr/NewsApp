// @flow
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {mergeElements} from '../../utils';
import {connect} from 'react-redux';

// Store and service imports
import NewsService from '../../store/services/NewsService';
import * as NewsActions from '../../store/actions/NewsActions';
import * as NewsSelector from '../../store/reducers/NewsReducer';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

// Project Components
import Navigation from '../../components/Navigation';
import NewsGroup from '../Landing/components/NewsGroup';

const styles: Object = (theme) => ({
    root: {
        maxWidth: 1000,
        width: '100%',
        minHeight: '100vh',
        margin: 'auto',
        paddingTop: 12,
        paddingBottom: 100,
    },
    topSection: {
        backgroundColor: 'white',
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.1)',
    },
    topContent: {
        padding: '22px 22px 4px 22px',
        maxWidth: 1000,
        margin: 'auto',
    }
});

type P = {
    classes: Object,
    match: Object,
    getNewsByCategory: Function,
    setNews: Function,
}

type S = {
    isLoading: bool,
    news: Array<Object>,
}


class Category extends React.Component<P, S> {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            isFetching: false,
            news: [],
        }
    }

    componentDidMount() {
        this.fetchNewsByCategory();
    }

    componentDidUpdate(prevProps) {
        const category: string = this.props.match.params.category;
        const oldCategory: string = prevProps.match.params.category;
        if(category !== oldCategory) {
            this.setState({isLoading: true});
            this.fetchNewsByCategory();
        }
    }

    fetchNewsByCategory = async () => {
        const category: string = this.props.match.params.category;
        let news = this.props.getNewsByCategory(category) || [];

        if(news.length === 0) {
            this.setState({isLoading: true});
            await NewsService.fetchNewsByCategory(category, (isError: bool, data: Array<Object>) => {
                if(isError === false) {
                    this.props.setNews(data);
                    news = this.props.getNewsByCategory(category) || [];
                    this.setState({news: news});
                }
            });
        } else {
            this.setState({news: news});
        }
        this.setState({isLoading: false});
    }

    render() {
        const {classes} = this.props;
        const {news} = this.state;
        const data = mergeElements(6, news, 0);
        const category: string = this.props.match.params.category;

        return (
            <Navigation isLoading={this.state.isLoading} whitesmoke>
                <div className={classes.topSection}>
                    <div className={classes.topContent}>
                        <Typography variant='display1' gutterBottom>{category ? category.charAt(0).toUpperCase() + category.slice(1) : ''}</Typography>
                    </div>
                </div>
                <Grow in={!this.state.isLoading}>
                <div className={classes.root}>
                    {data.length > 0 && 
                        data.map((value, i) => (
                            <NewsGroup key={i} data={value} right={i%2 === 0}/>
                        ))
                    }
                    {data.length === 0 && <Typography variant='subheading' align='center'>Ingen annonser å vise</Typography>}
                </div>
                </Grow>
            </Navigation>
        )
    }
}

const mapStateToProps: Function = (state: Object) => ({
    getNewsByCategory: (category) => NewsSelector.getNewsByCategory(category)(state),
});

const mapDispatchToProps: Function = (dispatch: Function) => ({
    setNews: (data) => dispatch(NewsActions.setNewsItems(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Category));
