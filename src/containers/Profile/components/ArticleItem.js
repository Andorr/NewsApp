// @flow
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import moment from 'moment';

// Material UI Components
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

// Project Components
import Flex from '../../../components/layout/Flex';

type P = {
    classes: Object,
    onClick: Function,
    title: string,
}

const styles: Object = {
    root: {
        display: 'grid',
        gridTemplateColumns: '84px auto',
        maxWidth: '100vw',

        borderBottom: '1px solid rgba(0,0,0,0.1)',
    },
    imageWrapper: {
        width: 60,
        height: 60,
        maxWidth: 60,
        maxHeight: 60,
        padding: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        maxHeight: 60,
        objectFit: 'cover',

        border: '1px solid rgba(0,0,0,0.2)',
    },
    ellipsis: {
        '@media only screen and (max-width: 800px)': {
            fontSize: '0.8rem',
        }
    }
}

const ArticleItem: React.StatelessFunctionalComponent<P> = (props: Object) => {
    const {classes} = props;
    return (
        <ListItem className={classes.root} button onClick={props.onClick}>
            <div className={classes.imageWrapper}>
                <img className={classes.image} src={props.image} alt={props.title} />
            </div>
            <Flex dir='column' align='flex-start'>
                <Typography className={classes.ellipsis} variant='subheading' align='left' gutterBottom>{props.title}</Typography>
                <Typography variant='caption' align='left'>{moment(props.time).calendar()}</Typography>
            </Flex>
        </ListItem>
    )
}

export default withStyles(styles)(ArticleItem);