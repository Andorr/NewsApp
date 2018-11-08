import {actions} from '../actions/NewsActions';
import {keyBy} from 'lodash';

const initialState = {
    news: {},
    categories: [],
};

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actions.SET_NEWS_ITEMS: { // Store all given news items by id
            return {...state, news: keyBy(action.payload, 'id')}
        }

        case actions.SET_NEWS_ITEM: { // Store or overwrite existing news item by id
            
            const news = Object.assign({}, state.news);
            const newsItem = action.payload;
            if(newsItem.id) {
                news[newsItem.id] = newsItem; // Set news item
            }
            return {...state, news: news};
        }

        case actions.SET_COMMENT_ITEM: { // Sets a comment by id
            const news = Object.assign({}, state.news);
            const newsId = action.id;
            
            // Find the news item exists
            if(news[newsId]) {
                // Find index of comment
                const commentId = action.payload._id;
                const index = news[newsId].comments.findIndex((c) => c._id === commentId);
                if(index !== -1) {
                    news[newsId].comments[index] = action.payload;
                } else {
                    news[newsId].comments.unshift(action.payload);
                }
                return {...state, news: news};
            } else {
                return state;
            }
        }

        case actions.DELETE_COMMENT_ITEM: { // Deletes a comment
            const news = Object.assign({}, state.news);
            const newsId = action.id;

            if(news[newsId]) {
                // Find comment index
                const commentId = action.payload;
                const index = news[newsId].comments.findIndex((c) => c._id === commentId);
                if(index !== -1) {
                    news[newsId].comments.splice(index, 1);
                }
                return {...state, news: news};
            } else {
                return state;
            }
        }

        case actions.SET_CATEGORIES: { // Set categories
            const categories: Array<string> = action.payload;
            if(categories instanceof Array) {
                return {...state, categories: categories};
            } else {
                return state;
            }
        }

        default: {
            return state;
        }
    }
}

// --- SELECTORS ---
const getNewsReducer = (state) => state.news;

export const getNews = (state) => Object.values(getNewsReducer(state).news);

export const getNewsById = (id) => (state) => getNewsReducer(state).news[id];

export const getCategories = (state) => getNewsReducer(state).categories;

export const getNewsByCategory = (category) => (state) => getNews(state).filter(n => n.category === category);

export default reducer;