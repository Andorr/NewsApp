export const actions: Object = {
    SET_NEWS_ITEMS: 'SET_NEWS_ITEMS',
    SET_NEWS_ITEM: 'SET_NEWS_ITEM',
    SET_COMMENT_ITEM: 'SET_COMMENT_ITEM',
    DELETE_COMMENT_ITEM: 'DELETE_COMMENT_ITEM',
    SET_CATEGORIES: 'SET_CATEGORIES',
    DELETE_NEWS_ITEM: 'DELETE_NEWS_ITEM',
};


// Fills the news-state with given data
export const setNewsItems: Function = (data: Object) => (
    (dispatch) => {
        if(data instanceof Array) {
            dispatch({type: actions.SET_NEWS_ITEMS, payload: data.map(createNewsItem)})
        }
    }
);

// Sets an current item
export const setNewsItem: Function = (data: Object) => (
    (dispatch) => {
        if(data.constructor === Object) {
            dispatch({type: actions.SET_NEWS_ITEM, payload: createNewsItem(data)});
        }
    }
);

export const deleteNewsItem: Function = (id: string) => (
    (dispatch) => {
        if(typeof id === 'string') {
            dispatch({type: actions.DELETE_NEWS_ITEM, payload: id});
        }
    }
)

// Set comment
export const setComment: Function = (newsId: string, comment: Object) =>
    (dispatch) => dispatch({type: actions.SET_COMMENT_ITEM, payload: comment, id: newsId});

// Delete comment
export const deleteComment: Function = (newsId: string, commentId: string) => 
    (dispatch) => dispatch({type: actions.DELETE_COMMENT_ITEM, payload: commentId, id: newsId});

export const setCategories: Function = (data: Array<string>) =>
    (dispatch) => dispatch({type: actions.SET_CATEGORIES, payload: data});


// --- Helpers ---

const createNewsItem: Object = (data) => ({
    id: data._id,
    voteCount: data.vote_count,
    commentCount: (data.comments)? data.comments.length : 0,
    created_at: data.created_at || '',
    ...data,
});

export class Comment {
    _id: string;
    comment: string;
    user: string;
    user_nickname: string;
    created_at: string;
    updated_at: ?string;
}

export class News {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    created_at: string;
    image: string;
    category: string;
    importance: number;
    comments: Comment[];
    isVoted: ?bool;
    author: {
        user: string;
        email: string;
        nickname: string;
        image: ?string;
    };
}