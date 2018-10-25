// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Project Components

type P = {
    classes: Object,
    className: string,
    image?: string,
    title?: string,
    large: boolean,
}

const styles: Object = {
    root: {
        overflow: 'hidden',
        backgroundColor: 'white',
        width: '100%',
    },
    image: {
        width: '100%',
        height: 'auto',
        maxHeight: 275,
        objectFit: 'cover',
    },
    large: {
        maxHeight: 400,
    },
    imageWrapper: {
        overflow: 'hidden',
    },
    textWrapper: {
        padding: 28,
    },
    text: {
        fontSize: '1.8rem',
    },
    lgText: {
        fontSize: '3rem',
    },
}

class NewsItem extends Component<P> {

    render() {
        const {classes, className, image, title, subtitle} = this.props;
        return (
            <Paper className={classNames(classes.root, className)} square elevation={1}>
                <div className={classes.imageWrapper}>
                    <img className={classNames(classes.image, this.props.large ? classes.large : '')} src={image} alt={title} />
                </div>
                <div className={classes.textWrapper}>
                    <Typography className={classNames(classes.text, this.props.large ? classes.lgText : '')} gutterBottom >{title}</Typography>
                    {this.props.large && <Typography variant='title' >{subtitle}</Typography>}
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(NewsItem);