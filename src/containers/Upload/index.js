// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import URLS from '../../URLS';
import {connect} from 'react-redux';
import {type Match} from '../../types';

// API and service imports
import NewsService from '../../store/services/NewsService';
import * as NewsActions from '../../store/actions/NewsActions';
import * as NewsSelector from '../../store/reducers/NewsReducer';
import * as UserSelector from '../../store/reducers/UserReducer';

// Material UI Components
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// Icons
import Delete from '@material-ui/icons/Delete';

// Project Components
import Navigation from '../../components/Navigation';
import TextEditor from '../../components/inputs/TextEditor';
import Flex from '../../components/layout/Flex';
import Select from '../../components/inputs/Select';
import FileInput from '../../components/inputs/FileInput';

const styles: Object = (theme) => ({
    root: {
        maxWidth: 1000,
        margin: 'auto',
        marginTop: '100px',
        marginBottom: 100,

        '@media only screen and (max-width: 800px)': {
            marginTop: 0,
        },
    },
    imageWrapper: {
        minHeight: 340,
        backgroundColor: 'whitesmoke',

        '@media only screen and (max-width: 800px)': {
            minHeight: 100,
        },
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
        gridTemplateColumns: '1fr',
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
    smr: {marginRight: 12},
    buttonWrapper: {
        color: theme.palette.error.main,
    }
});

type P = {
    classes: Object,
    history: Object,
    match: Match,
    getNewsById: Function,
    setNewsItem: Function,
    deleteNewsItem: Function,
    userInfo: Object,
}

type S = {
    isLoading: bool,
    isEditing: bool,

    imageLink: string,
    title: string,
    subtitle: string,
    content: string,
    category: string,
    importance: number,

    uploadedImage: ?Object,
    previewImage: ?Object,
}

const importance: Array<Object> = [{value: 1, name: 'Important'}, {value: 2, name: 'Less important'}]
let category: Array<Object> = [{value: 'other', name: 'Other'}];

class Upload extends Component<P, S> {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            isEditing: false,

            imageLink: '',
            title: '',
            subtitle: '',
            content: '',
            category: category[0].value,
            importance: importance[0].value,

            uploadedImage: null,
            previewImage: null,
        }
    }

    componentDidMount() {
        this.fetchNewsData();
    }

    fetchNewsData = async () => {
        await NewsService.getCategories(async (isError: bool, categories: Array<string>) => {
            if(categories && categories.length > 0) {
                category = categories.map((value) => ({value: value, name: value.charAt(0).toUpperCase() + value.slice(1)}));
                await this.setState({category: category[0].value});
            }
        });

        // If is provided, enter edit-mode, and load 
        const id: string = this.props.match ? this.props.match.params.id : '';
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
            const userId: string = this.props.userInfo ? this.props.userInfo.id : '';
            if(news && ((news.author && news.author.user === userId) || (!news.author || !news.author.user))) {
                this.setState({
                    title: news.title,
                    subtitle: news.subtitle,
                    content: news.content,
                    category: news.category || 'other',
                    importance: news.importance || 0,
                    imageLink: news.image,
                    isEditing: true,
                });
            }
        }
    }

    handleChange = (name: string, isValue: bool = false) => (event: SyntheticInputEvent<HTMLInputElement>) => {
        this.setState({[name]: (isValue) ? event : event.target.value});
    }

    deleteUploadedImages = () => {
        this.setState({
            uploadedImage: null,
            previewImage: null,
        })
    }

    handleFileUpload = (event: SyntheticInputEvent<HTMLInputElement>) => {
        const inputFile: File = event.target.files[0];

        if(inputFile) {
            // Extract to previewable file
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                // Store files in state
                this.setState({
                    uploadedImage: inputFile,
                    previewImage: e.target.result,
                });
            }

            reader.readAsDataURL(inputFile);
        }
    }

    resetValues = () => {
        this.setState({title: '', imageLink: '', subtitle: '', content: '', category: '', importance: 1});
    }

    getInputData = () => {
        const {title, subtitle, content, category, importance} = this.state;

        // Create news
        const newsItem: Object = {
            title,
            subtitle,
            content,
            category,
            importance,
        }

        // Validate image input
        const {uploadedImage, imageLink} = this.state;
        if(uploadedImage) {
            newsItem.image = uploadedImage;
        } else {
            newsItem.image_link = imageLink;
        }

        return newsItem;
    }

    createNews = (event: SyntheticEvent<HTMLInputElement>) => {
        event.preventDefault();

        if(this.state.isLoading) {
            return;
        }

        // Get data
        const newsItem = this.getInputData();
        this.setState({isLoading: true});
        
        let uploadRequest = (newsItem.image)? NewsService.createNewsItemWithFile : NewsService.createNewsItem;
        // Save data
        
        uploadRequest(newsItem, (isError: bool, data: Object) => {
            if(isError === false && this.props.history) {
                this.props.history.push(URLS.detail.concat('/', data._id));
            } else {
                this.setState({isLoading: false});
            }
        });

    }

    saveNews = (event: SyntheticEvent<HTMLInputElement>) => {
        event.preventDefault();

        if(this.state.isLoading) {
            return;
        }

        // Get data
        const newsItem: Object = this.getInputData();

        let uploadRequest = (newsItem.image)? NewsService.updateNewsItemWithFile : NewsService.updateNewsItem;

        // Save data
        this.setState({isLoading: true});
        const id: string = this.props.match ? this.props.match.params.id : '';
        uploadRequest(id, newsItem, (isError: bool, data: Object) => {
            if(isError === false && this.props.history) {
                this.props.setNewsItem(data);
                this.props.history.push(URLS.detail.concat('/', data._id));
            } else {
                this.setState({isLoading: false});
            }
        });
    }

    deleteNews = (event: SyntheticEvent<HTMLInputElement>) => {
        event.preventDefault();

        if(this.state.isLoading) {
            return;
        }

        // Delete item
        this.setState({isLoading: true});
        const id: string = this.props.match.params.id;
        NewsService.deleteNewsItem(id, (err: bool, data: Object) => {
            if(!err) {
                this.props.deleteNewsItem(id);
                this.props.history.push(URLS.profile);
            } else {
                this.setState({isLoading: false});
            }
        });

    }

    render() {
        const {classes} = this.props;
        const {isEditing} = this.state;
        const previewImage = this.state.previewImage || this.state.imageLink;

        return (
            <Navigation isLoading={this.state.isLoading}>
                {this.state.isLoading ? null :
               <Paper className={classes.root} elevation={1} square>
                    <div className={classes.imageWrapper}>
                        <img className={classes.image} src={previewImage} alt={this.state.title} />
                    </div>

                    <form className={classes.content} onSubmit={(isEditing)? this.saveNews : this.createNews}>
                        <div className={classes.topSection}>

                                <TextField
                                    fullWidth
                                    className={classes.mb}
                                    label='Title'
                                    variant='outlined'
                                    value={this.state.title}
                                    onChange={this.handleChange('title')}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    className={classes.mb}
                                    label='Subtitle'
                                    variant='outlined'
                                    value={this.state.subtitle}
                                    onChange={this.handleChange('subtitle')}
                                    required
                                />

                                <TextField
                                    fullWidth
                                    className={classes.mb}
                                    label='Image-link'
                                    variant='outlined'
                                    value={this.state.imageLink}
                                    onChange={this.handleChange('imageLink')}
                                    />
                                
                                
                                <Flex>
                                    <FileInput onChange={this.handleFileUpload} />
                                    <IconButton
                                        onClick={this.deleteUploadedImages}
                                        disabled={this.state.uploadedImage === null}>
                                        <Delete />
                                    </IconButton>
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
                }
            </Navigation>
        )
    }
}

const mapStateToProps = (state: Object) => ({
    getNewsById: (id) => NewsSelector.getNewsById(id)(state),
    userInfo: UserSelector.getUserInfo(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
    setNewsItem: (data: Object) => dispatch(NewsActions.setNewsItem(data)),
    deleteNewsItem: (id: string) => dispatch(NewsActions.deleteNewsItem(id)),
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Upload));