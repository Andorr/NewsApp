import {actions} from '../actions/UserActions';

const initialState = {
    email: null,
    nickname: null,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case actions.SET_USER_INFO: {
            return {...state, email: action.payload.email, nickname: action.payload.nickname};
        }

        default: {
            return state;
        }
    }
}

// --- SELECTORS ---
const getUserReducer: Object = (state: Object) => state.user;

export const getUserInfo: Object = (state: Object) => ({...getUserReducer(state)});

export default reducer;