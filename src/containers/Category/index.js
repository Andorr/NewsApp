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
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

// Project Components
import Navigation from '../../components/Navigation';
import NewsGroup from '../Landing/components/NewsGroup';

const styles: Object = {
    root: {
        maxWidth: 1000,
        margin: 'auto',
        paddingTop: 30,
        paddingBottom: 100,
    },
    topSection: {
        padding: 22,
        maxWidth: 1000,
        margin: 'auto',
    }
}

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
            this.setState({isLoading: false});
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
            <Navigation isLoading={this.state.isLoading}>
                <div className={classes.topSection}>
                    <Typography variant='display1' gutterBottom>{category ? category.charAt(0).toUpperCase() + category.slice(1) : ''}</Typography>
                    <Divider />
                </div>
                <div className={classes.root}>
                    {this.state.isFetcing && <CircularProgress /> }
                    {data.length > 0 && 
                        data.map((value, i) => (
                            <NewsGroup key={i} data={value} right={i%2 === 0}/>
                        ))
                    }
                    {data.length === 0 && <Typography variant='subheading' align='center'>Ingen annonser å vise</Typography>}
                </div>
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
