import {actions} from '../actions/NewsActions';
import {keyBy} from 'lodash';

const initialState = {
    news: {},
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

        default: {
            return state;
        }
    }
}

// --- SELECTORS ---
const getNewsReducer = (state) => state.news;

export const getNews = (state) => Object.values(getNewsReducer(state).news);

export const getNewsById = (id) => (state) => getNewsReducer(state).news[id];

export default reducer;