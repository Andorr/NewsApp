// @flow
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import URLS from '../../../URLS';

// Material UI Components

// Project Components
import NewsItem from '../../../components/NewsItem';

type P = {
    classes: Object,
    data: Array<Object>,
    right: boolean,
}

const styles: Object = {
    root: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateAreas: "'a a b' 'c d e'",
        gridTemplateRows: 'auto',
        gridGap: '16px',
        marginBottom: 12,

        '@media only screen and (max-width: 600px)': {
            gridTemplateColumns: '100%',
            gridTemplateAreas: 'unset',
            gridTemplateRows: 'repeat(4, auto)',
            padding: '0 4px 16px 4px',
        },
    },
    item1: {gridArea: 'a', order: 0,'@media only screen and (max-width: 600px)': {gridArea: 'unset'}},
    item2: {gridArea: 'b', order: 1,'@media only screen and (max-width: 600px)': {gridArea: 'unset'}},
    item3: {gridArea: 'c', order: 2,'@media only screen and (max-width: 600px)': {gridArea: 'unset'}},
    item4: {gridArea: 'd', order: 3,'@media only screen and (max-width: 600px)': {gridArea: 'unset'}},
    item5: {gridArea: 'e', order: 4,'@media only screen and (max-width: 600px)': {gridArea: 'unset'}},
    left: {
        gridTemplateAreas: "'a b b' 'c d e'",
        '@media only screen and (max-width: 600px)': {
            gridTemplateAreas: 'unset',
        },
    }
}

const itemN: Function = (order: number) => ('item'.concat(order.toString()));

class NewsGroup extends Component<P> {

    static defaultProps = {
        right: true,
    }

    render() {
        const {classes, data, right} = this.props;
        const news: Array<Object> = (data ? data.slice(0, 5) : []);

        return (
            <div className={classNames(classes.root, right ? '' : classes.left)}>
                {news.map((value, index) => (
                    <NewsItem
                        to={URLS.detail.concat('/', value.id)}
                        key={index}
                        image={value.image}
                        title={value.title}
                        subtitle={value.subtitle}
                        className={classes[itemN(index+1)]} />
                ))}
            </div>
        )
    }
}

export default withStyles(styles)(NewsGroup);