import {IRequest} from './http';

export default {
    // News endpoints
    getNews: () => {
        return new IRequest('GET', 'news/');
    },
    getNewsById: (id: string) => {
        return new IRequest('GET', 'news/'.concat(id));
    },
    getNewsByUser: (userId: string) => {
        return new IRequest('GET', 'news/?user='.concat(userId));
    },
    voteNews: (id: string) => {
        return new IRequest('POST', 'news/vote/', {news: id});
    },
    createNews: (data: Object) => {
        return new IRequest('POST', 'news/', data);
    },
    updateNews: (id: string, data: Object) => {
        return new IRequest('PUT', 'news/'.concat(id), data);
    },
    deleteNews: (id: string) => {
        return new IRequest('DELETE', 'news/'.concat(id));
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