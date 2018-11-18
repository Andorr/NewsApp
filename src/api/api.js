// @flow
import {IRequest} from './http';

export default {
    // News endpoints
    getNews: (): IRequest => {
        return new IRequest('GET', 'news/');
    },
    getNewsById: (id: string): IRequest => {
        return new IRequest('GET', 'news/'.concat(id));
    },
    getNewsByUser: (userId: string): IRequest => {
        return new IRequest('GET', 'news/?user='.concat(userId));
    },
    getNewsByCategory: (category: string): IRequest => {
        return new IRequest('GET', 'news/?category='.concat(category));
    },
    getNewsWithParams: (params: Object): IRequest => {
        return new IRequest('GET', 'news/?'.concat(Object.keys(params).map(p => p + '=' + params[p] + '&').join('')));
    },
    voteNews: (id: string): IRequest => {
        return new IRequest('POST', 'news/vote/', {news: id});
    },
    createNews: (data: Object): IRequest => {
        return new IRequest('POST', 'news/', data);
    },
    createNewsWithFile: (data: Object): IRequest => { // Sends request with form-data
        return new IRequest('POST_FILE', 'news/', data);
    },
    updateNews: (id: string, data: Object): IRequest => {
        return new IRequest('PUT', 'news/'.concat(id), data);
    },
    updateNewsWithFile: (id: string, data: Object): IRequest => {
        return new IRequest('PUT_FILE', 'news/'.concat(id), data);
    },
    deleteNews: (id: string): IRequest => {
        return new IRequest('DELETE', 'news/'.concat(id));
    },

    // Comments
    createNewsComment: (data: Object): IRequest => {
        return new IRequest('POST', 'news/comment/', data);
    },
    deleteNewsComment: (newsId: string, commentId: string): IRequest => {
        return new IRequest('DELETE', 'news/comment/'.concat(commentId), {news: newsId});
    },
    updateNewsComment: (newsId: string, commentId: string, comment: string): IRequest => {
        return new IRequest('PUT', 'news/comment/'.concat(commentId), {news: newsId, comment: comment});
    },

    // Categories
    getCategories: (): IRequest => {
        return new IRequest('GET', 'news/category', null, null, false);
    },

    // Profile
    uploadProfileImage: (data: Object): IRequest => {
        return new IRequest('POST_FILE', 'account/avatar/', data);
    },
};

export const AUTH = {
    createAccount: (email: string, password: string, nickname: string): IRequest => {
        return new IRequest('POST', 'account/signup', {email, password, nickname});
    },

    token: (email: string, password: string): IRequest => {
        return new IRequest('POST', 'account/login', {email, password});
    },

    fetchUser: (): IRequest => {
        return new IRequest('GET', 'account/');
    }
};