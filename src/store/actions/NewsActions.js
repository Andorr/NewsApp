export const actions = {
    SET_NEWS_ITEMS: 'SET_NEWS_ITEMS',
    SET_NEWS_ITEM: 'SET_NEWS_ITEM',
    SET_COMMENT_ITEM: 'SET_COMMENT_ITEM',
    DELETE_COMMENT_ITEM: 'DELETE_COMMENT_ITEM',
    SET_CATEGORIES: 'SET_CATEGORIES',
};


// Fills the news-state with given data
export const setNewsItems = (data: Object) => (
    (dispatch) => {
        if(data instanceof Array) {
            dispatch({type: actions.SET_NEWS_ITEMS, payload: data.map(createNewsItem)})
        }
    }
);

// Sets an current item
export const setNewsItem = (data: Object) => (
    (dispatch) => {
        if(data.constructor === Object) {
            dispatch({type: actions.SET_NEWS_ITEM, payload: createNewsItem(data)});
        }
    }
);

// Set comment
export const setComment = (newsId: string, comment: Object) =>
    (dispatch) => dispatch({type: actions.SET_COMMENT_ITEM, payload: comment, id: newsId});

// Delete comment
export const deleteComment = (newsId: string, commentId: string) => 
    (dispatch) => dispatch({type: actions.DELETE_COMMENT_ITEM, payload: commentId, id: newsId});

export const setCategories = (data: Array<string>) =>
    (dispatch) => dispatch({type: actions.SET_CATEGORIES, payload: data});


// --- Helpers ---

const createNewsItem = (data) => ({
    id: data._id,
    voteCount: data.vote_count,
    commentCount: (data.comments)? data.comments.length : 0,
    created_at: data.created_at || '',
    ...data,
});