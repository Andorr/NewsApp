// @flow
import { actions } from '../actions/NewsActions';
import { keyBy, merge } from 'lodash';
import moment from 'moment';
import {News} from '../actions/NewsActions';

type NewsObject = { 
    [id: string]: News
};

type State = {
    news: NewsObject,
    categories: Array<string>,
}

const initialState: State = {
    news: {}, // News by id
    categories: []
};

const reducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case actions.SET_NEWS_ITEMS: {
            // Store all given news items by id
            return {
                ...state,
                news: merge(state.news, keyBy(action.payload, 'id'))
            };
        }

        case actions.SET_NEWS_ITEM: {
            // Store or overwrite existing news item by id

            const news: NewsObject = Object.assign({}, state.news);
            const newsItem: Object = action.payload || {};
            if (newsItem.id) {
                news[newsItem.id] = newsItem; // Set news item
            }
            return { ...state, news: news };
        }

        case actions.DELETE_NEWS_ITEM: {
            const news: NewsObject = Object.assign({}, state.news);
            const id: string = action.payload;
            if(news[id]) {
                delete news[id];
            }
            return {...state, news: news};
        }

        case actions.SET_COMMENT_ITEM: {
            // Sets a comment by id
            const news: NewsObject = Object.assign({}, state.news);
            const newsId: string = action.id;

            // Find the news item exists
            if (news[newsId]) {
                // Find index of comment
                const commentId: string = action.payload._id || action.payload.id;
                const index: number = news[newsId].comments.findIndex(
                    (c) => c._id === commentId
                );
                if (index !== -1) {
                    news[newsId].comments[index] = action.payload;
                } else {
                    news[newsId].comments.unshift(action.payload);
                }
                return { ...state, news: news };
            } else {
                return state;
            }
        }

        case actions.DELETE_COMMENT_ITEM: {
            // Deletes a comment
            const news: NewsObject = Object.assign({}, state.news);
            const newsId: string = action.id;

            if (news[newsId]) {
                // Find comment index
                const commentId: string = action.payload;
                const index: number = news[newsId].comments.findIndex(
                    (c) => c._id === commentId
                );
                if (index !== -1) {
                    news[newsId].comments.splice(index, 1);
                }
                return { ...state, news: news };
            } else {
                return state;
            }
        }

        case actions.SET_CATEGORIES: {
            // Set categories
            const categories: Array<string> = action.payload;
            if (categories instanceof Array) {
                return { ...state, categories: categories };
            } else {
                return state;
            }
        }

        default: {
            return state;
        }
    }
};

// --- SELECTORS ---
const getNewsState = (state: Object) => state.news;

export const getNews = (state: Object): Array<News> =>
    Object.values(getNewsState(state).news);

export const getNewsById = (id: string): Function => (state: Object): News =>
    getNewsState(state).news[id];

export const getCategories = (state: Object): Array<string> =>
    getNewsState(state).categories;

export const getNewest = (state: Object): Array<News> => getNews(state).sort((a: Object, b: Object) => moment(a.created_at).diff(b.created_at)).slice(0, 5);

export const getNewsByImportance = (importance: number): Function => (state: Object): Array<News> =>
    getNews(state).filter(
        (n: Object) => n.importance === importance
    ).sort((a: Object, b: Object) => -moment(a.created_at).diff(b.created_at));

export const getNewsByCategory = (category: string): Function => (state: Object): Array<News> =>
    getNews(state).filter((n: Object) => n.category === category);

export default reducer;
