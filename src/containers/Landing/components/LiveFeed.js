// @flow
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import moment from 'moment';
import {Link} from 'react-router-dom';
import URLS from '../../../URLS';

// Material UI Components
import Typograhpy from '@material-ui/core/Typography';

// Project Components
import Flex from '../../../components/layout/Flex';

// External Project Components
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type P = {
    classes: Object,
    data: Array<Object>,
}

const styles: Object = {
    root: {
        height: 'auto',
        backgroundColor: 'white',
        overflowX: 'hidden',
    },
    wrapper: {
        padding: 16,
        maxWidth: 1000,
        margin: 'auto',

        '@media only screen and (max-width: 800px)': {
            padding: 10,
        },
    },
    item: {
        
        borderRight: '1px solid rgba(0,0,0,0.1)',
        padding: '1px 12px 2px 8px',

        '&:hover': {
            textDecoration: 'underline',
            color: 'black',
        }
    },
    itemTitle: {
        marginRight: 10,

        '@media only screen and (max-width: 800px)': {
            fontSize: '0.8rem',
            fontWeight: 'bold',
        },
    },
    itemTime: {
        flexGrow: 1,

        '@media only screen and (max-width: 800px)': {
            fontSize: '0.5rem'
        },
    },
    pulse: {
        margin: 10,
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
        <Link to={props.to || ''} style={{textDecoration: 'none'}}>
            <div className={props.className}>
                
                <Flex>
                    <Typograhpy className={classes.itemTitle} variant='title' gutterBottom>{props.title}</Typograhpy>
                    <Typograhpy className={classes.itemTime} variant='caption' align='right'>{moment(props.time).fromNow()}</Typograhpy>
                </Flex>
                <Typograhpy variant='caption'>{props.subtitle}</Typograhpy>
                
            </div>
        </Link>
    )
});

const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4350,
}

class LiveFeed extends React.Component<P> {

    render() {
        const {classes, data} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <Slider {...settings}>
                        {data && data.map((value, i) => (
                            <FeedItem
                                key={i}
                                to={URLS.detail.concat('/', value.id)}
                                className={classes.item}
                                title={value.title}
                                subtitle={value.subtitle}
                                time={value.created_at}/>
                        ))}
                    </Slider>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(LiveFeed);