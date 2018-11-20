// @flow
import {actions} from '../actions/UserActions';

type UserState = {
    email: ?string,
    nickname: ?string,
    id: ?string,
    image: ?string,
}

const initialState: UserState = {
    email: null,
    nickname: null,
    id: null,
    image: null,
};

const reducer = (state: UserState = initialState, action: any) => {
    switch(action.type) {

        case actions.SET_USER_INFO: {
            return {...state, email: action.payload.email, nickname: action.payload.nickname, id: action.payload.id, image: action.payload.image};
        }

        default: {
            return state;
        }
    }
}

// --- SELECTORS ---
const getUserReducer: Function = (state: Object): UserState => state.user;

export const getUserInfo: Function = (state: Object): UserState => ({...getUserReducer(state)});

export default reducer;