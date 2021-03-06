// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

// Material UI Components
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Project Components
import Pulse from '../components/Pulse';



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
        backgroundColor: 'whitesmoke',
        position: 'relative',
        minHeight: 100,
        '@media only screen and (max-width: 600px)': {
            minHeight: 100,
        }
    },
    textWrapper: {
        padding: 28,
        flexGrow: 1,
    },
    text: {
        fontSize: '1.8rem',
    },
    lgText: {
        fontSize: '3rem',

        '@media only screen and (max-width: 800px)': {
            fontSize: '2.1rem',
        }
    },
    pulse: {
        position: 'absolute',
        bottom: '-14px',
        height: 'auto',
        right: 30,
    }
}

type P = {
    classes: Object,
    className: string,
    image?: string,
    title?: string,
    subtitle?: string,
    large?: boolean,
    to: string,

    highlight: ?string,
}

class NewsItem extends Component<P> {

    render() {
        const {classes, className, image, title, subtitle} = this.props;
        return (
            <Paper className={classNames("hello", classes.root, className)} square elevation={1}>
                <Link to={this.props.to || ''} style={{textDecoration: 'none'}}>
                    <div className={classes.imageWrapper}>
                        <img className={classNames(classes.image, this.props.large ? classes.large : '')} src={image} alt={title} />
                        {this.props.highlight && <Pulse className={classes.pulse} label={this.props.highlight}/>}
                    </div>
                    <div className={classes.textWrapper}>
                        <Typography className={classNames(classes.text, this.props.large ? classes.lgText : '')} gutterBottom >{title}</Typography>
                        <Typography variant={(this.props.large)? 'title' : 'body2'} >{subtitle}</Typography>
                    </div>
                </Link>
            </Paper>
        )
    }
}

export default withStyles(styles)(NewsItem);