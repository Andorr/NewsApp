export const actions: Object = {
    SET_USER_INFO: 'SET_USER_INFO',
};

// Fills the news-state with given data
export const setUserInfo: Function = (data) => (
    (dispatch) => {
        dispatch({type: actions.SET_USER_INFO, payload: createUserItem(data)})
    }
);

// --- Helpers ---
const createUserItem: Function<Object> = (data) => ({
    id: data._id,
    email: data.email,
    nickname: data.nickname,
    image: data.image,
});