import {actions} from '../actions/NewsActions';

const initialState = {
    news: [],
};

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actions.SET_NEWS_ITEMS: {
            return {...state, news: action.payload}
        }

        case actions.SET_NEWS_ITEM: {
            // Does a news item with the given id already exists?
            const news = Object.assign([], state.news);
            const newsIndex = news.findIndex((elem) => elem.id === action.payload.id);
            if(newsIndex !== -1) {
                news[newsIndex] = action.payload;
            } else {
                news.unshift(action.payload);
            }

            return {...state, news: news};
        }

        default: {
            return state;
        }
    }
}

export default reducer;