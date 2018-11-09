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
    getNewsByCategory: (category: string) => {
        return new IRequest('GET', 'news/?category='.concat(category));
    },
    getNewsWithParams: (params: Object) => {
        return new IRequest('GET', 'news/?'.concat(Object.keys(params).map(p => p + '=' + params[p] + '&').toString()));
    },
    voteNews: (id: string) => {
        return new IRequest('POST', 'news/vote/', {news: id});
    },
    createNews: (data: Object) => {
        return new IRequest('POST', 'news/', data);
    },
    createNewsWithFile: (data: Object) => { // Sends request with form-data
        return new IRequest('POST_FILE', 'news/', data);
    },
    updateNews: (id: string, data: Object) => {
        return new IRequest('PUT', 'news/'.concat(id), data);
    },
    updateNewsWithFile: (id: string, data: Object) => {
        return new IRequest('PUT_FILE', 'news/'.concat(id), data);
    },
    deleteNews: (id: string) => {
        return new IRequest('DELETE', 'news/'.concat(id));
    },

    // Comments
    createNewsComment: (data: Object) => {
        return new IRequest('POST', 'news/comment/', data);
    },
    deleteNewsComment: (newsId: string, commentId: string) => {
        return new IRequest('DELETE', 'news/comment/'.concat(commentId), {news: newsId});
    },
    updateNewsComment: (newsId: string, commentId: string, comment: string) => {
        return new IRequest('PUT', 'news/comment/'.concat(commentId), {news: newsId, comment: comment});
    },

    // Categories
    getCategories: () => {
        return new IRequest('GET', 'news/category', null, false);
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