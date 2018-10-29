import {IRequest} from './http';

export default {
    getNews: () => {
        return new IRequest('GET', 'news/', false);
    },
    getNewsById: (id) => {
        return new IRequest('GET', 'news/'.concat(id), false);
    },
    voteNews: (id, vote) => {
        return new IRequest('POST', 'news/vote/', {news: id, upvote: vote});
    },
};
