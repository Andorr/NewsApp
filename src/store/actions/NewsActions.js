export const actions = {
    SET_NEWS_ITEMS: 'SET_NEWS_ITEMS',
    SET_NEWS_ITEM: 'SET_NEWS_ITEM',
};


// Fills the news-state with given data
export const setNewsItems = (data) => (
    (dispatch) => {
        if(data instanceof Array) {
            dispatch({type: actions.SET_NEWS_ITEMS, payload: data.map(createNewsItem)})
        }
    }
);

// Sets an current item
export const setNewsItem = (data) => (
    (dispatch) => {
        if(data.constructor === Object) {
            dispatch({type: actions.SET_NEWS_ITEM, payload: createNewsItem(data)});
        }
    }
);

// --- Helpers ---

const createNewsItem = (data) => ({
    id: data._id,
    voteCount: data.vote_count,
    commentCount: (data.comments)? data.comments.length : 0,
    ...data,
});