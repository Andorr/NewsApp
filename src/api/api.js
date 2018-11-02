import {IRequest} from './http';

export default {
    // News endpoints
    getNews: () => {
        return new IRequest('GET', 'news/', false);
    },
    getNewsById: (id: string) => {
        return new IRequest('GET', 'news/'.concat(id), false);
    },
    voteNews: (id: string) => {
        return new IRequest('POST', 'news/vote/', {news: id});
    },
    createNews: (data: Object) => {
        return new IRequest('POST', 'news/', data);
    },
    createNewsComment: (data) => {
        return new IRequest('POST', 'news/comment/', data);
    },
};

export const AUTH = {
    createAccount: (email: string, password: string, nickname: string) => {
        return new IRequest('POST', 'account/signup', {email, password, nickname});
    },

    token: (email: string, password: string) => {
        return new IRequest('POST', 'account/login', {email, password});
    },

    fetchUser: () => {
        return new IRequest('GET', 'account/');
    }
};