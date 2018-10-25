// @flow
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import moment from 'moment';

// Material UI Components
import Typograhpy from '@material-ui/core/Typography';

// Project Components
import Flex from '../../../components/layout/Flex';

type P = {
    classes: Object,
    data: Array<Object>,
}

const styles: Object = {
    root: {
        height: 'auto',
        backgroundColor: 'white',
    },
    wrapper: {
        padding: 16,
        maxWidth: 1000,
        margin: 'auto',
    },
    mr: {marginRight: 10},
    item: {
        marginRight: 20,
        borderRight: '1px solid rgba(0,0,0,0.1)',
        padding: '2px 12px 2px 2px',
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    }
}

type FeedProps = {
    title: string,
    subtitle: string,
    time: string,
};

const FeedItem : React.StatelessFunctionalComponent<FeedProps> = withStyles(styles)((props) => {
    const {classes} = props;
    return (
        <div className={props.className}>
            <Flex>
                <Typograhpy className={classes.mr} variant='title'>{props.title}</Typograhpy>
                <Typograhpy className={classes.grow} variant='caption' align='right'>{moment(props.time).fromNow()}</Typograhpy>
            </Flex>
            
            <Typograhpy variant='caption'>{props.subtitle}</Typograhpy>
            
        </div>
    )
});

class LiveFeed extends React.Component<P> {

    render() {
        const {classes, data} = this.props;
        return (
            <div className={classes.root}>
                <Flex className={classes.wrapper}>
                    {data && data.slice(0, 2).map((value, i) => (
                        <FeedItem
                            className={classes.item}
                            title={value.title}
                            subtitle={value.subtitle}
                            time={value.created_at}/>
                    ))}
                </Flex>
            </div>
        )
    }
}

export default withStyles(styles)(LiveFeed);