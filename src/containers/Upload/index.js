// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../../URLS';
import {connect} from 'react-redux';

// API and service imports
import NewsService from '../../store/services/NewsService';
import * as NewsSelector from '../../store/reducers/NewsReducer';
import * as UserSelector from '../../store/reducers/UserReducer';

// Material UI Components
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Project Components
import Navigation from '../../components/Navigation';
import TextEditor from '../../components/inputs/TextEditor';
import Flex from '../../components/layout/Flex';
import Select from '../../components/inputs/Select';

const styles: Object = (theme) => ({
    root: {
        maxWidth: 1000,
        margin: 'auto',
        marginTop: '100px',
        marginBottom: 100,
    },
    imageWrapper: {
        minHeight: 340,
        backgroundColor: 'whitesmoke',
    },
    image: {
        width: '100%',
        height: 'auto',
        maxHeight: 400,
        objectFit: 'cover',
    },
    content: {
        padding: 28,
    },
    topSection: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '14px 0',

        '@media only screen and (max-width: 600px)': {
            gridTemplateColumns: '1fr',
        },
        
    },
    editor: {
        border: '2px solid rgba(0,0,0,0.1)'
    },
    smPadding: {padding: 12},
    mb: {marginBottom: 24},
    mr: {marginRight: 24},
    buttonWrapper: {
        color: theme.palette.error.main,
    }
});

type P = {
    classes: Object,
    history?: Object,
    match?: Object,
    getNewsById: Function,
}

type S = {
    isLoading: bool,
    isEditing: bool,

    image: string,
    title: string,
    subtitle: string,
    content: string,
    category: string,
    importance: number,
}

const importance: Array<Object> = [{value: 1, name: 'Important'}, {value: 2, name: 'Less important'}]
const category: Array<Object> = [{value: 'news', name: 'News'}, {value: 'sport', name: 'Sport'}, {value: 'culture', name: 'Culture'}];

class Upload extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            isEditing: false,

            image: '',
            title: '',
            subtitle: '',
            content: '',
            category: category[0].value,
            importance: importance[0].value,
        }
    }

    componentDidMount() {
        this.fetchNewsData();
    }

    fetchNewsData = async () => {
        // If is provided, enter edit-mode, and load 
        const id = this.props.match.params.id;
        if(id) {
            // Get news item by id
            let news: Object = this.props.getNewsById(id);

            // If not stored in state, fetch it
            if(!news) {
                this.setState({isLoading: true});
                await NewsService.fetchNewsItem(id, (isError, data) => {
                    news = data;
                    this.setState({isLoading: false});
                });
            }

            // If news is fetched
            if(news && ((news.author && news.author.user === this.props.userInfo.id) || (!news.author || !news.author.user))) {
                this.setState({
                    title: news.title,
                    subtitle: news.subtitle,
                    content: news.content,
                    category: news.category || '',
                    importance: news.importance || 0,
                    image: news.image,
                    isEditing: true,
                });
            }
        }
    }

    handleChange = (name: string, isValue: bool = false) => (event: Object) => {
        this.setState({[name]: (isValue) ? event : event.target.value});
    }

    resetValues = () => {
        this.setState({title: '', image: '', subtitle: '', content: '', category: '', importance: 1});
    }

    getInputData = () => {
        const {title, subtitle, content, category, importance} = this.state;
        // Validate image input
        const image: string = this.state.image;

        // Create news
        const newsItem: Object = {
            title,
            subtitle,
            image_link: image,
            content,
            category,
            importance,
        }
        return newsItem;
    }

    createNews = (event: SyntheticEvent) => {
        event.preventDefault();

        if(this.state.isLoading) {
            return;
        }

        // Get data
        const newsItem = this.getInputData();

        // Save data
        this.setState({isLoading: true});
        NewsService.createNewsItem(newsItem, (err, data) => {
            if(!err && this.props.history) {
                this.props.history.push(URLS.detail.concat('/', data._id));
                this.resetValues();
            } else {
                this.setState({isLoading: false});
            }
        });

    }

    saveNews = (event: SyntheticEvent) => {
        event.preventDefault();

        if(this.state.isLoading) {
            return;
        }

        // Get data
        const newsItem = this.getInputData();

        // Save data
        this.setState({isLoading: true});
        const id = this.props.match.params.id;
        NewsService.updateNewsItem(id, newsItem, (err, data) => {
            if(!err && this.props.history) {
                this.props.history.push(URLS.detail.concat('/', data._id));
            } else {
                this.setState({isLoading: false});
            }
        });
    }

    deleteNews = (event: SyntheticEvent) => {
        event.preventDefault();

        if(this.state.isLoading) {
            return;
        }

        // Delete item
        this.setState({isLoading: true});
        const id = this.props.match.params.id;
        NewsService.deleteNewsItem(id, (err, data) => {
            if(!err) {
                this.props.history.push(URLS.profile);
            } else {
                this.setState({isLoading: false});
            }
        });

    }

    render() {
        const {classes} = this.props;
        const {isEditing} = this.state;
        return (
            <Navigation>
               <Paper className={classes.root} elevation={1} square>
                    <div className={classes.imageWrapper}>
                        <img className={classes.image} src={this.state.image} alt={this.state.title} />
                    </div>

                    <form className={classes.content} onSubmit={(isEditing)? this.saveNews : this.createNews}>
                        <div className={classes.topSection}>
                            <Flex dir='column' align='flex-start'>
                                <TextField
                                    className={classes.mb}
                                    label='Title'
                                    variant='outlined'
                                    value={this.state.title}
                                    onChange={this.handleChange('title')}
                                    required
                                />
                                <TextField
                                    className={classes.mb}
                                    label='Subtitle'
                                    variant='outlined'
                                    value={this.state.subtitle}
                                    onChange={this.handleChange('subtitle')}
                                    required
                                />
                            </Flex>
                            <Flex dir='column' align='flex-end'>
                                <TextField
                                        className={classes.mb}
                                        label='Image-link'
                                        variant='outlined'
                                        value={this.state.image}
                                        onChange={this.handleChange('image')}
                                    />
                                <Button variant='raised' color='secondary' disabled>
                                    Upload Image
                                </Button>
                            </Flex>
                        </div>
                        <TextEditor
                            className={classes.editor}
                            editorClass={classes.smPadding}
                            value={this.state.content}
                            onChange={this.handleChange('content', true)}/>

                        <Flex justify='flex-start'>
                            <Select
                                className={classes.mr}
                                variant='outlined'
                                data={importance}
                                margin='normal'
                                value={this.state.importance}
                                onChange={this.handleChange('importance')}
                                required/>
                            <Select
                                variant='outlined'
                                data={category}
                                margin='normal'
                                value={this.state.category}
                                onChange={this.handleChange('category')}
                                required/>
                        </Flex>
                        {
                            (this.state.isEditing)?
                            <Flex className={classes.buttonWrapper} justify='space-between'>
                                <Button variant='contained' color='secondary' type='submit'>Save article</Button>
                                <Button variant='text' color='inherit' onClick={this.deleteNews}>Delete article</Button>
                            </Flex>
                            :
                            <Button variant='contained' color='secondary' type='submit'>Create article</Button>
                        }
                        
                    </form>
                </Paper>
            </Navigation>
        )
    }
}

const mapStateToProps = (state) => ({
    getNewsById: (id) => NewsSelector.getNewsById(id)(state),
    userInfo: UserSelector.getUserInfo(state),
})

export default connect(mapStateToProps)(withStyles(styles)(Upload));