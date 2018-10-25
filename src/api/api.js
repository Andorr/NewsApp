import {IRequest} from './http';

export default {
    getNews: () => {
        return new IRequest('GET', 'news/', false);
    },
    voteNews: (id, vote) => {
        return new IRequest('POST', 'news/vote/', {news: id, upvote: vote});
    },
};
