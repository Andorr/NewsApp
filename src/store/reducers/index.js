import { combineReducers } from 'redux';

// Project Reducers
import news from './NewsReducer';
import user from './UserReducer';

export default combineReducers({
    news,
    user,
});

